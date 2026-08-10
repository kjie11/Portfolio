# TechnicalIndex specification

## Overview

- Target files: `src/technical/main.tsx`, `src/technical/technical.css`
- Screenshots: `docs/design-references/xrarchitect-home-desktop.png`, `xrarchitect-home-mobile.png`
- Interaction model: hover/tap card navigation.

## Structure

- Fixed 64 px navigation.
- 1152 px max-width inner surface with a compact intro band.
- CSS columns masonry: 3 / 2 / 1 columns at 1024 px and 768 px breakpoints, 12 px gaps.
- Five semantic project buttons with a stable media box and bottom overlay.

## Exact Reference Values

- Body: Inter/system sans, 16 px, white background, `#171717` text.
- Desktop index: width 1152 px at 1440 viewport.
- Card width: about 376 px; border radius 8 px; margin-bottom 12 px.
- Overlay: bottom aligned, 12 px padding, opacity transition 300 ms.
- Video: object-fit cover/contain as appropriate, transform transition 700 ms; hover scale 1.05.
- Mobile: 390 px viewport, 8 px outer gutter, one column, secondary nav links hidden.

## Content

- Use the existing five project titles, roles, media, language switch, and hash routes.
- Intro copy remains bilingual but compact. Do not render the old status grid or workflow section on the homepage.
- Missing media must use an explicit preview placeholder, not a fabricated visual.

## Accessibility

- Cards are buttons with visible focus state and localized accessible labels.
- Hover playback must also work on keyboard focus where motion is allowed.
- Respect `prefers-reduced-motion`.

