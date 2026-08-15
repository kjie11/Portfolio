# BrainCo Section Handoff

## Current State

- Target page: `D:\Portfolio\index.html`
- BrainCo is a featured-project viewer plus a six-project collection rail.
- The featured preview video plays directly; collection card videos only preview on hover/focus.
- Selecting a main-image arrow changes the featured project and highlights/scrolls to its matching collection card.
- Collection arrows sit over the rail's left/right center and scroll one rail width per click.

## Latest UI Decisions

- Desktop BrainCo header: title and description share one row.
- Featured media ratio: `11 / 4`; collection follows immediately below it.
- Featured arrows: `56px`, inset `24px` from the feature edges.
- Collection arrows: `48px`, vertically centered on the rail and aligned to its outer edges.
- Mobile arrows are at least `44px` wide/high.
- The collection title was deliberately removed. Arrow buttons have ARIA labels but no native `title` tooltip.

## Files

- `D:\Portfolio\index.html`: BrainCo markup and interaction logic.
- `D:\Portfolio\css\style.css`: BrainCo layout and controls.
- `D:\Portfolio\tests\verify-brainco.mjs`: focused structural checks.

## Verification Run

```powershell
Set-Location D:\Portfolio
node tests\verify-brainco.mjs
```

The last browser check confirmed desktop control proportions/insets, collection next-button scrolling, and mobile 44px targets. The Impeccable detector only reports the pre-existing Helvetica font warning.

## Suggested Next Step

Open `D:\Portfolio\index.html` and continue visual tuning from the BrainCo section; preserve the current keyboard focus, `prefers-reduced-motion`, hover/focus preview behavior, and collection-to-feature selection sync.
