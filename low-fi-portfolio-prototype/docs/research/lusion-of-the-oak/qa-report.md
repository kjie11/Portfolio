# QA Report

## Source -> Baseline

| Level | Result | Evidence | Notes |
|---|---|---|---|
| Build | passed | `node --check`; `git diff --check` | HTML scripts and generated WebGL data parse cleanly |
| GPU | passed | `qa_xr_tear.mjs`; `qa-xr-tear/local-card-drag.png` | All programs link in browser; blue-noise and SMAA runtime flags reach ready |
| Structural | passed with customization | Source bundle lines 3677, 3683, 3696, 4084-4091, 4170/4186; Choo Choo pointer sweep | Blur, timing, texture state and pass order match source facts; radius is intentionally 62.5% for the requested finer profile |
| Visual | passed with expected scene gap | Source pointer captures vs `qa-xr-tear/local-card-drag.png` | Deformation transports the complete portfolio scene; fixed grain and hard jagged fold edges are removed |
| Temporal | passed | Source RAF plus local active/dissipation assertions | Delta seconds are clamped to .05; feedback dissipates and RAF stops while idle |
| Interaction | passed | `qa_xr_tear.mjs` ScreenPaint assertions | Current-frame movement controls radius and pointer movement distorts cards/background |

## Comparisons

| Scenario | Source Evidence | Baseline Evidence | Result |
|---|---|---|---|
| Pointer sweep | `evidence/screenshots/pointer-sweep-1440x900.png` | `qa-xr-tear/local-card-drag.png` | Stroke responds to current displacement and carries full-scene color |
| Choo Choo fine profile | `evidence/screenshots/choo-choo-pointer-sweep.png` | `qa-xr-tear/local-card-drag.png` | Reduced injection radius while retaining the same soft spectral folds |
| 1200ms decay | `evidence/screenshots/pointer-decay-1200ms.png` | QA smoke dissipation/RAF assertions | Source dissipations are applied directly per active frame; local field decays and stops |
| Resource and post graph | Public bundle and extracted PNG hashes | Runtime datasets `blueNoise=lusion-128-nearest-repeat`, `smaa=lusion-smaa-1x` | Passed |
| Local file fallback | `file://` full QA route | Embedded data-URL bridge in `assets/xr-webgl-data.js` | Passed without WebGL cross-origin texture errors |

## Repair Rounds

| Round | Change | Result |
|---|---|---|
| 1 | Responsive radius and current segment distance | passed source/static and runtime radius assertion |
| 2 | Exact nine-tap blur and two-texel spacing | passed source assertion and GPU compile |
| 3 | Extracted animated blue-noise with file-safe bridge | passed texture readiness and file-origin WebGL upload |
| 4 | Clamped seconds timing and direct dissipations | passed source assertion and decay behavior |
| 5 | Full-resolution three-pass SMAA after distortion | passed shader compile, LUT readiness and pass-order assertions |

## Issues

No open ScreenPaint P0/P1/P2 issue. Remaining P3 items are documented in `known-gaps.md`.

The page-wide QA continues beyond all XR assertions and then fails on the pre-existing Polaroid wheel centering assertion. That assertion was not weakened.

## Gate Decisions

| Gate | Decision | Evidence |
|---|---|---|
| TARGET_LOCK_GATE | passed | `scout-card.json` |
| REPLAY_READY_GATE | passed | `replay-manifest.json` |
| BASELINE_VERIFY | passed with documented P3 gaps | This report, runtime QA and screenshots |
| PROJECT_VERIFY | pending | A page-wide green run is blocked by the unrelated Polaroid assertion |

## Final Status

`DONE_BASELINE_VERIFIED`
