# XR Fisheye Background Specification

## Overview

- Target file: `index.html`
- Reference: `https://com.manychat.com/`
- Source implementation: `https://github.com/sveta-koliada/com-gallery/blob/v8.8.8/intro-sphere.min.js`
- Screenshots: `docs/design-references/manychat-fisheye-pointer-left.png`, `docs/design-references/manychat-fisheye-pointer-right.png`
- Interaction model: pointer-driven WebGL fisheye; the tear progress only reveals the canvas.

## DOM Structure

- The existing `.rq-xr-stage` remains the isolated viewport.
- The existing `[data-rq-xr-distortion]` canvas renders the warped background.
- The paper tear and XR cards remain separate DOM layers and must not be distorted.

## Reference Shader Parameters

- Fisheye level: `1.4`
- Virtual camera distance used during the reference intro: `25.0`
- Pointer yaw influence: `0.3 * PI`
- Pointer pitch influence: `0.2 * PI`
- Initial pointer: `(0.5, 0.5)`
- Target pointer clamp: `0..1`
- Mouse interpolation ramps toward `0.1`; the vertical interpolation is `0.7` of horizontal.
- Edge luminance multiplier: `smoothstep(2.0, 1.6, length(screenPosition)) * 0.15 + 0.85`
- Canvas: absolute, inset `0`, width/height `100%`, z-index `1` in the reference.

## Projection Model

The final reference state does not use a polynomial CSS-style barrel transform. It maps normalized screen coordinates onto a 3D fisheye direction:

```glsl
float len = length(screenPosition);
float angle = len * 1.4;
vec3 direction = vec3(screenPosition / len * sin(angle), -cos(angle));
```

The direction is then rotated in `xz` and `yz` using the pointer-derived yaw and pitch before its `xy` coordinates sample the texture. This spherical direction mapping is the primary cause of the visible inward screen curvature.

## Local Adaptation

- Use the original project image `assets/xr-skybox-360.png`.
- Keep the reference values documented as the baseline, but use a stronger local adaptation because the supplied background is an ultra-wide `1456 x 720` image rather than the reference gallery crop.
- Local fisheye level: `1.82`.
- Local pointer yaw: `0.42 * PI`.
- Local pointer pitch: `0.30 * PI`.
- Compensate up to `1.25` for the texture-to-viewport aspect correction so cover cropping does not cancel the visible warp.
- Preserve the existing cover-style aspect correction.
- Keep the existing CSS background as the WebGL fallback.
- Remove the former radial blur, chromatic aberration, and animated grain because they are not part of the inspected reference shader.
- Strengthen the CSS fallback transforms so `file://` previews still show a clear response when WebGL texture upload is unavailable.
- Respect reduced motion by leaving the pointer centered.

## Responsive Behavior

- Desktop: full fisheye with pointer yaw/pitch.
- Touch/mobile: centered fisheye with no required pointer tracking.
- Canvas resolution remains capped at `1.5` device pixel ratio in the local implementation for performance.
