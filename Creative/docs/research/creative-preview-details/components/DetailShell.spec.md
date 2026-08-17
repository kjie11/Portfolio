# DetailShell Specification

## Overview
- Target file: `assets/creative-detail-clone.js`
- Screenshot references: all files under `docs/design-references/creative-preview-details`
- Interaction model: click/keyboard project selection; native document scrolling and video controls

## DOM Structure
- Install a new `[data-rq-panel="creative-detail"]` section inside `#ruyan-portfolio-wireframe`.
- Top nav contains Ruyan Qin and All Projects / About / Contact / CV labels matching the source.
- Main article contains hero media, grid, header copy, facts/actions aside, narrative modules, optional video, and project footer navigation.
- Read project records from `window.RUYAN_CREATIVE_DETAIL_DATA`; never paraphrase or synthesize copy.

## Rendering
- Map all 19 existing low-fi IDs to their source filenames.
- Render source `summaryHtml` verbatim so multi-paragraph introductions remain separate.
- Render every fact, action, section paragraph/list item, optional video, evidence image, and navigation label from data.
- Rewrite extracted localhost media URLs to `../images`, `../videos`, or `../portfolio-evidence` paths.
- Video elements preserve autoplay, muted, loop, playsinline, controls, poster, and accessible labels.
- Disabled actions render as disabled buttons. External links use `target="_blank"` and `rel="noopener noreferrer"`.

## Behaviors
- Capture click and keydown for existing project triggers before the incumbent detail handler, then stop propagation only for matched triggers.
- Opening hides all incumbent panels, shows the cloned detail panel, scrolls to top, and focuses Back to Index.
- Returning restores the home panel and focus to the original trigger.
- Previous/next render another project without leaving the detail surface.
- Back, All Projects, and top All Projects use the same return function.
- Preserve the low-fi home DOM, XR effects, card order, and every unrelated script.

## Accessibility and Failure States
- Semantic header/nav/main/article/aside/footer structure.
- Buttons for in-app state changes; anchors only for real URLs.
- Visible focus comes from the layout stylesheet.
- If data or the target root is unavailable, do nothing and leave the incumbent detail system usable.

