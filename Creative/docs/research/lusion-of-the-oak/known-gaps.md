# Known Gaps

## Resolved In Production

| Former Gap | Evidence | Resolution |
|---|---|---|
| Cumulative fixed-radius stroke | `index.html` `getXrTrailRadiusCss` / `updateXrSmokeField` | Current segment displacement maps over 0..100; the maximum is intentionally scaled to 62.5% (`max(24, viewportWidth / 32)`) for the Choo Choo World fine profile |
| Five-tap low-field blur | `index.html` `smokeBlurProgram` | Source nine-tap weights and two-texel active blur spacing are in use |
| Static procedural display noise | `assets/xr-lusion-blue-noise.png`; display uniforms | Extracted 128x128 nearest/repeat texture uses a random coordinate offset every active frame; hash is load-failure fallback only |
| Missing post-distortion antialiasing | SMAA programs, LUTs and full-size targets in `index.html` | Distortion now feeds edges, weights and neighborhood-blend passes in source order |
| Frame-scale timing approximation | `updateXrSmokeField` | Velocity injection uses clamped delta seconds; source dissipations and minimum decay apply once per active frame |

## Remaining Non-Blocking Gaps

| Gap | Severity | Unknown Class | Evidence | Impact | Next Step |
|---|---|---|---|---|---|
| Exact live Lusion WebGL1/WebGL2 context was not directly captured | P3 | important | Three.js source prefers WebGL2; local replay deliberately supports WebGL1 | May cause small precision differences, not a render-graph mismatch | Capture one target GPU frame if exact cross-browser precision becomes required |
| Optional route-specific Bloom/Final/FSR activity was not frame-captured | P3 | important | Core order is source-proven; active optional pass subset remains partial | Small color/edge differences may remain outside ScreenPaint | Capture one source GPU frame with the Of The Oak route active |
| Source and portfolio scenes differ | P3 | expected scope | Source screenshots vs `qa-xr-tear/local-card-drag.png` | Absolute pixel diff is not meaningful; deformation behavior is comparable | Keep fixed pointer/timing comparisons focused on stroke geometry and decay |
| Unrelated Polaroid wheel assertion remains red | P3 | existing regression | `qa_xr_tear.mjs` fails at `Polaroid wheel motion did not settle on the centered card` after all XR assertions pass | Prevents a fully green page-wide QA run but does not affect XR rendering | Repair separately without weakening the assertion |

## Fidelity Tier

The portfolio ScreenPaint path is `SOURCE_REPLAY` for low-field blur, blue-noise, active-frame timing, distortion and SMAA wiring. The 62.5% radius profile, portfolio scene content and idle RAF shutdown are intentional project adaptations.
