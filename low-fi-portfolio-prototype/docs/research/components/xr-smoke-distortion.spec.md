# XR Smoke Distortion Specification

## Overview
- **Target file:** `index.html`
- **Reference:** `https://lusion.co/projects/of_the_oak`
- **Reference screenshot:** `C:/Users/brainco/AppData/Local/Temp/codex-clipboard-53dc458e-d9d9-4ba7-a66b-dba1fae375d3.png`
- **Interaction model:** Pointer-speed-driven screen-paint feedback trail, active only after the XR paper has opened.

## Reference Implementation Findings
- The reference uses a fixed full-viewport WebGL canvas at 1.5 device-pixel scale.
- Pointer input is written into a screen-paint velocity/weight field. The primary field runs at one-quarter viewport resolution and its low-frequency blur field at one-eighth resolution.
- Extracted reference defaults: velocity dissipation `.975`, primary weight dissipation `.95`, secondary weight dissipation `.8`, noise enabled, curl scale `.02`, curl strength `3`, distortion amount `3`, RGB shift `.5`, color multiplier `10`, displacement multiplier `5`.
- The trail is primarily stretched scene content with narrow RGB folds, not a separately colored dark membrane. Its radius is derived from the current frame's pointer displacement, not accumulated pointer travel: `fit(frameDistancePx, 0, 100, 0, maxRadius)`.
- The reference does not use a fixed `100px` radius at all desktop widths. Each frame it sets `maxRadius = max(40, viewportWidth / 20)`, so the 1440px reference capture uses `72px`; the extracted `100` value is only the default/config ceiling reached around a 2000px viewport.
- Portfolio customization (Choo Choo World visual match): retain the source displacement response but scale the maximum radius to 62.5%, `max(24, viewportWidth / 32)`. This gives a `45px` ceiling at 1440px while preserving the source blur, color transport and SMAA behavior.
- The display distortion uses the real `128 x 128` `LDR_RGB1_0.png` blue-noise texture with nearest filtering and repeat wrapping. Its UV offset is reset to two new random values every render frame.
- The one-eighth-resolution feedback copy uses an exact separable nine-tap Gaussian kernel with weights `.1633`, `.1531`, `.12245`, `.0918`, and `.051`; the sample spacing is two low-field texels per tap step.
- The distortion pass runs at render order `75`, before PostUfx (`100`) and SMAA (`500`). This final SMAA pass materially softens the spectral fold edges.
- Because the reference composites the screen-paint pass late in its WebGL pipeline, the trail visually crosses and distorts both background and project media.
- Live pointer sampling over the Of The Oak media shows that the membrane interior remains close to transparent: most of its perceived body is stretched scene content, while dark absorption and spectral color are concentrated in narrow fold contours. Media pixels remain recognizable after crossing the media boundary and are carried into the surrounding background.

## Implemented Architecture
- The smoke canvas owns a dedicated WebGL 1 context and follows the reference ScreenPaint architecture rather than a pressure-projected fluid solver.
- A bounded quarter-resolution RGBA field runs through two unsigned-byte framebuffer textures in ping-pong order. Red/green carry centered velocity; blue/alpha carry independently dissipating paint weights.
- A one-eighth-resolution copy of the feedback field receives a strong separable blur and drives broad inverse advection and curl noise on the next frame.
- Each animation frame draws one continuous segment-distance field from the last rendered pointer position to the newest position. Sharp direction changes receive turn-proportional endpoint smoothing, while straight movement stays tightly coupled to the pointer. The production implementation now derives radius from current segment displacement and uses the source responsive maximum.
- Feedback uses the extracted reference constants directly: velocity dissipation `.975`, primary weight dissipation `.95`, secondary weight dissipation `.8`, minimum weight decay `.004`, push strength `25`, curl scale `.02`, and curl strength `3`.
- A full-resolution offscreen scene framebuffer is rebuilt while the fluid is active: the skybox is drawn first, followed by five rasterized card textures.
- The skybox source is the live fish-eye sphere canvas, not the original panorama file. Its animated unwrap and pointer-driven yaw/pitch are uploaded before each fluid composite so the full-framebuffer pass does not replace the existing background interaction.
- Card quads use the live CSS `matrix3d`, transform origin, z translation, and parent perspective, keeping the sampled card pixels aligned with the visible DOM cards during burst and gaze motion.
- The late composite pass uses the extracted Lusion sampling layout: it derives velocity from the averaged field weights, offsets by the extracted animated blue-noise texture, samples the complete offscreen scene nine times along that velocity, and averages the samples. A phase-shifted RGB term creates narrow colored folds where velocity is strongest. The procedural hash remains only as a texture-load fallback.
- There is no separate color-history framebuffer. Background and card colors are transported because the late distortion samples the already-composited full scene framebuffer, matching the reference rendering order.
- The distortion constants mirror the reference logic: amount `3`, multiplier `5`, RGB phase shift `.5`, and color multiplier `10`.
- Five 480px WebP previews are embedded as data URLs in `assets/xr-webgl-data.js`, so the iframe can build canvas-safe card textures even when the portfolio is opened directly through `file://`.
- A reduced WebP copy of the panoramic sky is embedded beside the card previews. It keeps the existing sphere shader origin-clean under `file://`, allowing its live output to be sampled by the fluid context.
- While feedback is visible, the display pass presents the entire offscreen scene rather than a transparent distortion overlay. DOM card paint is temporarily hidden to avoid duplicated text and edges, but the original elements remain in place as transparent click and keyboard targets.
- When feedback clears, the WebGL canvas fades out and DOM card paint is restored. The canvas always keeps `pointer-events: none`, so detail navigation remains owned by the semantic DOM layer.
- The display canvas is capped at `1.5` device-pixel ratio, the primary feedback field at one quarter display resolution (capped at `640 x 384`), and the low field at one eighth display resolution (capped at `320 x 192`). Rendering stops when energy falls below `.006`.

## DOM Structure
- Add one `canvas.rq-xr-smoke` with `data-rq-xr-smoke` inside `.rq-xr-stage`.
- The smoke canvas is above XR cards but below no interactive controls; it must use `pointer-events: none`.
- Do not add wrappers around existing cards.
- Each XR card's existing `.rq-media` contains its real project preview image copied from the reference portfolio; the same image must be rasterized into the WebGL card texture.

## Project Media
- Abyss: `assets/xr-abyss.jpg`, video `https://www.youtube.com/watch?v=Jfq4dHgv87M`.
- Emotional Mask: `assets/xr-emotional-mask.jpg`, video `https://www.youtube.com/watch?v=AvCc4186Ol4`.
- AR Escape Room: `assets/xr-ar-escape-room.png`, video `https://www.youtube.com/watch?v=Qz9FfWEAgcA`.
- Speaking World: `assets/xr-speaking-world.png`, video `https://www.youtube.com/watch?v=j5jeKZbRmL8`.
- AR Graffiti: `assets/xr-ar-graffiti.png`, video `https://www.youtube.com/watch?v=IBjiM0_Ek-c`.

## Visual Layer
- Absolute inset `0`, full stage width/height, z-index above the cards' runtime z-index.
- Opacity follows both smoke energy and `--rq-xr-release`; it must be invisible while the paper is closed.
- Maintain the quarter-resolution RGBA ScreenPaint field and its one-eighth-resolution blurred feedback copy, then composite at a capped display resolution.
- Use a connected but light membrane, not decorative independent circles: stretched scene pixels form its body, while cyan/amber/magenta interference is restricted to narrow folds.
- Trail radius grows with the current frame's pointer displacement. It should contract again for slower movement instead of remaining at the maximum after cumulative travel crosses a threshold.

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
- On fine-pointer hover or keyboard focus, ease the active card to `1.025x` over roughly `420ms` with `cubic-bezier(.16, 1, .3, 1)` character; leaving reverses without a jump.
- Detect strong scene gradients in the final ScreenPaint pass and increase RGB separation only where an active brush stroke intersects them. This lets the oil-film field pull color from card edges without tinting the whole card.

### Pointer Leave / Section Exit / Reverse
- Pointer leave stops injection and switches to aggressive dissipation so the field clears without a background animation loop.
- Leaving the section or reversing the paper rapidly fades and clears the field, then stops its frame loop.
- Re-entry starts from an empty field.

## Responsive And Accessibility
- Enable only for `(hover: hover) and (pointer: fine)` and when reduced motion is not requested.
- Touch devices and `prefers-reduced-motion` show the existing static XR scene with no smoke simulation or card impact.
- Canvas is `aria-hidden="true"`.
- Reduced-motion and touch layouts keep the existing focus outline and do not add spatial hover scaling.

## QA
- Move the pointer rapidly across desktop XR after the paper opens: a connected trail must appear and persist across several frames.
- Confirm the canvas has non-transparent pixels while active and returns to transparent after dissipation/exit.
- Compare card transforms with the pointer trail near versus far from a card; the nearby card must react more.
- Confirm smoke does not exist before release, does not block card clicks, and does not run on touch/reduced-motion layouts.
- Confirm no horizontal overflow and no permanent animation frame after the trail fades.
