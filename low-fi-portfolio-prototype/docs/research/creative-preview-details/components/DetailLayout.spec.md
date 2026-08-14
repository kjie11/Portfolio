# DetailLayout Specification

## Overview
- Target file: `assets/creative-detail-clone.css`
- Screenshots: `docs/design-references/creative-preview-details/*-desktop.png` and `*-mobile.png`
- Interaction model: static layout plus sticky facts and CSS hover/focus states

## Foundation
- Self-host `assets/fonts/Jgs-SingleLine.ttf` as JGS and `assets/fonts/MontaguSlab-VariableFont_opsz,wght.ttf` as Montagu.
- Paper `#f1efeb`; ink `#11110f`; line `rgba(17,17,15,.4)`; muted `#68665f`.
- Gutter `clamp(20px, 4vw, 64px)`; max detail width `1200px`.
- Body: Segoe UI/Arial, 1.65 line height. Display: Montagu. Labels: JGS.
- Selection inverts paper and ink. Focus is 2px currentColor with 4px offset.

## Desktop Computed Styles at 1440px
- Top navigation: 72px minimum height, horizontal flex, 32px main gap and 24px nav gap.
- Hero media: width 1200px, 16:9, 1px line border, square corners, `#dedad1` background.
- Detail grid: `829.406px 298.594px`, column gap 72px, top/bottom padding 80px/104px.
- Title: Montagu 52px/55.12px, weight 400, letter spacing 0, max 20ch.
- Summary and narrative: 17px/28.9px, max 68ch/70ch, color `#34332f`.
- Section headings: Montagu 36px/39.6px, margin 64px 0 16px.
- Facts: sticky at 24px, 1px ink top rule; each row has 14px vertical padding and a 1px translucent top rule.
- Action controls: square 1px borders, minimum 48px; primary ink/paper and secondary transparent/ink.
- Footer navigation: three columns, 96px minimum row height, 1px rules.

## Responsive Behavior
- At 900px: grid areas become header, facts, details in one column; facts become static; body copy becomes 16px.
- At 560px: content width is `calc(100% - 32px)`; hero stays 16:9; title is `clamp(36px, 10vw, 46px)` and computes to 39px at 390px.
- At 560px: footer is two columns; All projects spans both columns above previous/next.
- No horizontal overflow at 390px.

## States
- Back: transparent to ink background fill, 240ms cubic-bezier; text ink to paper.
- Primary action hover: ink/paper to transparent/ink; secondary action does the inverse.
- Disabled action: translucent border, muted text, 0.72 opacity.
- Reduced motion disables transitions and smooth scrolling.

