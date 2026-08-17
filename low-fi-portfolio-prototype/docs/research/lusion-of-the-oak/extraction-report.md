# Extraction Report

## Source

- URL: `https://lusion.co/projects/of_the_oak`
- Captured at: `2026-08-11T13:18:33+08:00`
- Permission boundary: public page, public bundle and public texture assets

## Target Visual

Pointer-driven ScreenPaint liquid-membrane distortion that transports the already-rendered scene and adds narrow phase-shifted RGB folds.

## Target Surface Group

`surface-1`, fixed full-viewport `#canvas`, owned by the main-thread Three.js r158 App renderer.

## Evidence Summary

The browser inventory found three canvases. Target-bound source ties ScreenPaint to `#canvas`; a six-point pointer sweep produced the requested membrane and a later frame captured its decay. The public bundle exposed the complete update shader, display shader, blue-noise resource, low blur kernel, pass ordering, dt rule and pointer radius formula.

## Replay Route

`SOURCE_REPLAY`

## Captured Facts

- Surface: full viewport `#canvas`, 2160x1350 backing at a 1440x900 capture
- Runtime/backend: Three.js r158, main thread, WebGL renderer
- Render graph: scene/post input -> ScreenPaintDistortion 75 -> PostUfx 100 -> SMAA 500
- Resources: animated `LDR_RGB1_0.png`, `smaa-area.png`, `smaa-search.png`
- Timing: global RAF, seconds, dt clamped to `.05`, random blue-noise offset every frame
- Inputs: current-frame pointer displacement controls radius and velocity injection
- Output/composite: opaque fixed Three.js canvas, sRGB default, premultiplied alpha false

## Baseline

- Path: existing portfolio implementation in `index.html`
- Status: runs and transports scene color, but open P1/P2 fidelity gaps prevent baseline verification

## Editable Project

- Path: existing portfolio project
- Status: not modified during this analysis turn

## Known Gaps

See `known-gaps.md` and `LUSION-STROKE-GAP-ANALYSIS.md`.

## Deferred Work

- Implement the four source-backed changes.
- Capture fixed-condition 0ms/250ms/1200ms comparisons.
- Only after those pass, investigate active optional post effects or exact live WebGL context if a residual mismatch remains.
