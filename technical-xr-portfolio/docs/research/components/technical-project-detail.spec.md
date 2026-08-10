# TechnicalProjectDetail specification

## Overview

- Target files: `src/technical/TechnicalProjectDetail.tsx`, `src/technical/project-detail.css`
- Screenshots: `docs/design-references/xrarchitect-detail-desktop.png`, `xrarchitect-detail-mobile.png`
- Interaction model: static detail route with back and external-media actions.

## Structure

- Reuse the technical fixed navigation above the detail page.
- Lead media first. Desktop width 1024 px centered; mobile uses 8 px gutters.
- Back command below media, then a 36 px / 40 px title.
- Desktop content grid: approximately 2/3 narrative and 1/3 metadata. Stack below 760 px.
- Narrative: overview paragraph, Key Work list, capabilities/workflow detail, and current status.
- Metadata: roles, technologies, project scale, year.
- Optional supporting images appear after the information grid.
- Responsive 16:9 YouTube section follows. Current projects have no supplied URLs, so render a polished placeholder with a play icon and localized text.

## Styling

- Max content width 1024 px; white background; `#171717` text; muted `#6b6b6b`.
- Lead media and supporting media use radius 8 px, without decorative card wrappers.
- Title is 36 px on desktop and mobile, line-height 40 px, weight 700.
- Section headings are compact, 14 px, uppercase in English and normal-case Chinese.
- Metadata values may use small rectangular tags; do not use pills.

## Content Mapping

- Short description: `project.premise`.
- Detailed overview: `project.technicalAngle`.
- Key Work: `project.contribution`.
- Roles: `project.role`.
- Technologies: engine + `project.capabilities`.
- Scale: independent prototype.
- Year: `project.year`.
- Supporting images: `project.extraMedia`.
- YouTube: `project.youtubeUrl` when later supplied, otherwise placeholder.

