# Case Keyword Scroll Color Specification

## Overview
- Target: `.rq-pizza-title em` in the two homepage case-study sections.
- Reference: `https://shakib.design/` project headings use one fixed accent color per project keyword.
- Interaction model: viewport-entry color transition driven by `IntersectionObserver`.

## Reference States
- Shakib project keyword colors observed: orange `rgb(232, 96, 26)`, green `rgb(89, 154, 8)`, blue `rgb(48, 111, 200)`, pink `rgb(223, 100, 165)`.
- Reference keywords are `em` elements inside project `h2` headings.

## Portfolio States
- Resting: keyword inherits `--rq-ink`.
- Pizza active: warm coral `#d9562b` in light mode, `#ff8b5d` in dark mode.
- AR research active: cobalt blue `#2f68c9` in light mode, `#79a8ff` in dark mode.
- Transition: `780ms cubic-bezier(.16,1,.3,1)` on color and a restrained color-matched text shadow.

## Trigger
- Observer threshold: `0.15`.
- Bottom root margin: `-26%`, so the transition begins after the heading enters the lower-middle viewport.
- Entering the trigger area activates the keyword.
- Scrolling upward until the heading moves below the trigger area restores the resting color, allowing replay on the next downward entry.

## Accessibility
- `prefers-reduced-motion` removes the transition and displays the final project color immediately.
- The accent colors retain readable contrast against the existing light and dark surfaces.
