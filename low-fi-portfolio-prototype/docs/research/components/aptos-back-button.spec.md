# Aptos-Inspired Back Button Specification

## Overview
- **Target file:** `low-fi-portfolio-prototype/index.html`
- **Reference:** `https://aptosnetwork.com/`
- **Screenshot:** `C:/Users/25727/AppData/Local/Temp/codex-clipboard-a1da7530-0df4-47b2-8568-3759528e797a.png`
- **Interaction model:** hover and keyboard-focus feedback

## Scope
- Change only the creative standalone portfolio detail-page back button.
- Preserve its label, left arrow, click behavior, focusability, and leftward return meaning.
- Replace the expanding black circular mask with the Aptos pill material and palette.

## Extracted Reference Values
- Outer dark surface: `rgb(15, 14, 11)` / `#0f0e0b`
- Default light button surface: `rgb(249, 249, 240)` / `#f9f9f0`
- Hover surface in dark mode: `rgb(239, 236, 202)` / `#efecca`
- Height: `45px`
- Radius: full pill
- Reference overlay transition: `transform 300ms cubic-bezier(.4, 0, .2, 1)`
- Reference overlay state: `scaleX(0)` to `scaleX(1)`

## Adapted Structure
- `.rq-back`: black outer pill shell.
- `.rq-back::before`: inset cream pill (`#f9f9f0`) that leaves a narrow black edge visible.
- `.rq-back-fill`: inset pale-yellow hover layer (`#efecca`).
- Existing label and arrow layers remain above both surfaces.

## States and Behavior
- Default: cream inset pill visible; hover fill collapsed with `scaleX(0)`.
- Hover/focus-visible: pale-yellow layer expands from the right edge toward the left using `transform-origin: right center` and `scaleX(1)`.
- Exit: layer collapses toward the left with base `transform-origin: left center`.
- Existing default label exits right; existing arrow/label enters from the right and settles leftward.
- Active: retain the existing subtle `scale(.98)` press feedback.
- Reduced motion: no spatial transition; the pale-yellow state change may occur instantly.

## Responsive Behavior
- Preserve the current width and placement at desktop and mobile breakpoints.
- No new dependency or JavaScript.
