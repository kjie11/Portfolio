# Aptos-Inspired Sticky Fold Stack Specification

## Overview
- **Target file:** `low-fi-portfolio-prototype/index.html`
- **Reference URL:** `https://aptosnetwork.com/`
- **Reference recording:** `C:/Users/25727/Videos/屏幕录制/屏幕录制 2026-08-12 003302.mp4`
- **Interaction model:** scroll-driven sticky stacking

## Scope
- Apply only to the three homepage case sections beginning with Pizza Delivery:
  1. Pizza Delivery
  2. AugSoc / AR Graffiti Research
  3. Plant Bot
- Do not affect XR, Playground, Process, About, project detail panels, or the technical portfolio.
- Preserve every existing click and keyboard detail-page entry.

## Extracted Aptos Structure
- Group wrapper: `position: relative`.
- Three direct child sections.
- Desktop/tablet section state:
  - `position: sticky`
  - `top: 0px`
  - `overflow: clip`
  - full viewport-scale height
  - later siblings paint over earlier siblings naturally
- Each section retains a top divider; the moving divider is the visible fold/crease.
- No 3D rotation, animation library, or JavaScript is used for the stack itself.
- Aptos uses its `sm:sticky` responsive variant, so narrow mobile view remains normal document flow.

## Portfolio Adaptation
- Add one `.rq-fold-stack` wrapper around the existing three sections.
- Under `min-width: 721px` and `prefers-reduced-motion: no-preference`:
  - wrapper: `position: relative`
  - direct case-section children: `position: sticky; top: 0; overflow: clip; background: var(--rq-page)`
  - assign increasing z-index values in DOM order
  - preserve existing `min-height: 100svh`
- Keep the existing section top borders as the crease.
- Outside that media query, sections stay in ordinary flow.

## Responsive and Accessibility
- Desktop/tablet (`>= 721px`): sticky cover/fold sequence.
- Mobile (`< 721px`): ordinary vertical flow, matching the reference site's narrow behavior.
- Reduced motion: ordinary vertical flow; no sticky spatial covering.
- No hidden content, forced scroll capture, wheel interception, or new dependency.

## Verification
- Scroll downward and upward through all three sections.
- Confirm each later section covers the earlier one and reverses naturally.
- Confirm Pizza, Research, and Plant Bot still open their correct detail pages.
- Confirm Playground begins normal flow after Plant Bot.
