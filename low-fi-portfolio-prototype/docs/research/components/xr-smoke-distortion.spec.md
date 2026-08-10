# XR Smoke Distortion Specification

## Overview
- **Target file:** `index.html`
- **Reference:** `https://lusion.co/projects/of_the_oak`
- **Reference screenshot:** `C:/Users/brainco/AppData/Local/Temp/codex-clipboard-53dc458e-d9d9-4ba7-a66b-dba1fae375d3.png`
- **Interaction model:** Pointer-speed-driven persistent fluid trail, active only after the XR paper has opened.

## Reference Implementation Findings
- The reference uses a fixed full-viewport WebGL canvas at 1.5 device-pixel scale.
- Pointer input is written into a screen-paint velocity/weight field. The primary field runs at one-quarter viewport resolution and its low-frequency blur field at one-eighth resolution.
- Extracted reference defaults: velocity dissipation `.975`, primary weight dissipation `.95`, secondary weight dissipation `.8`, noise enabled, curl scale `.02`, curl strength `3`, distortion amount `3`, RGB shift `.5`, color multiplier `10`, displacement multiplier `5`.
- The trail is a dark refractive membrane with restrained cyan/amber chromatic fringes. It widens with pointer speed, curls, persists briefly, then diffuses.
- Because the reference composites the screen-paint pass late in its WebGL pipeline, the trail visually crosses and distorts both background and project media.

## DOM Structure
- Add one `canvas.rq-xr-smoke` with `data-rq-xr-smoke` inside `.rq-xr-stage`.
- The smoke canvas is above XR cards but below no interactive controls; it must use `pointer-events: none`.
- Do not add wrappers around existing cards.

## Visual Layer
- Absolute inset `0`, full stage width/height, z-index above the cards' runtime z-index.
- Opacity follows both smoke energy and `--rq-xr-release`; it must be invisible while the paper is closed.
- Render at a bounded low resolution for performance, then upscale smoothly.
- Use a connected ribbon/field, not decorative independent circles: dark translucent core, soft teal edge, very restrained amber/blue chromatic offsets.
- Trail radius grows with pointer speed and slowly expands while its opacity dissipates.

## States And Behaviors

### Closed / Title / Tear
- Canvas is cleared and hidden.
- Pointer movement must not seed a trail.

### XR Open
- Trigger once release is nearly complete and cards are beginning to appear.
- Pointer movement adds velocity-based splats along the segment between previous and current positions so fast movement cannot leave gaps.
- Continue rendering only while trail energy remains; stop the animation frame after the field has dissipated.

### Card Influence
- Reuse the existing XR animation frame and card transform composition.
- Each card receives a local influence from distance to the active smoke head, pointer velocity, and current smoke energy.
- Add restrained local translation and `rotateX/rotateY` response on top of existing burst, reverse, `rotateZ`, and gaze transforms.
- The overlay must visibly cross cards while their transforms react, but clicks, keyboard focus, and detail navigation remain unchanged.

### Pointer Leave / Section Exit / Reverse
- Pointer leave stops injection; existing smoke dissipates naturally.
- Leaving the section or reversing the paper rapidly fades and clears the field, then stops its frame loop.
- Re-entry starts from an empty field.

## Responsive And Accessibility
- Enable only for `(hover: hover) and (pointer: fine)` and when reduced motion is not requested.
- Touch devices and `prefers-reduced-motion` show the existing static XR scene with no smoke simulation or card impact.
- Canvas is `aria-hidden="true"`.

## QA
- Move the pointer rapidly across desktop XR after the paper opens: a connected trail must appear and persist across several frames.
- Confirm the canvas has non-transparent pixels while active and returns to transparent after dissipation/exit.
- Compare card transforms with the pointer trail near versus far from a card; the nearby card must react more.
- Confirm smoke does not exist before release, does not block card clicks, and does not run on touch/reduced-motion layouts.
- Confirm no horizontal overflow and no permanent animation frame after the trail fades.
