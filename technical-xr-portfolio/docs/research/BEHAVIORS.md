# xrarchitect.xyz behavior audit

## Homepage

- Interaction model: hover + click on desktop; tap + navigation on mobile.
- The work index is a CSS masonry layout: 3 columns at 1440 px, 2 columns from 768 px, and 1 column below 768 px. Column gap and vertical card gap are 12 px.
- Each project card is a short muted looping video with a poster. Videos are paused at rest. Hover starts playback, fades the title/role overlay from opacity 0 to 1 over 300 ms, and scales the video from 1 to about 1.05 over 700 ms.
- Clicking a card navigates to an independent project detail route. It does not open YouTube directly.
- The navigation is fixed at 64 px high. Secondary links disappear on mobile.
- The intro block is intentionally brief; it labels the portfolio before the media grid instead of explaining the work at length.

## Project Detail

- Interaction model: static reading page with a back command and external links.
- The first content signal is a large project video. At 1440 px it is centered at 1024 px wide. On mobile it fills the available width with 8 px page gutters.
- The title follows the media. The content area then splits into a wide narrative column and a narrow metadata column on desktop and stacks on mobile.
- Narrative order: Project Overview, Key Work, optional external links.
- Metadata order: Roles, Technologies, Project Scale, Year.
- Long-form media is conditional. Project 2 embeds a responsive YouTube iframe after the written detail; project 99 exposes a YouTube link and uses a local video. Other projects may use image sequences or local video instead.
- Detail pages use the same restrained 8 px media radius and Inter/system typography as the index.

## Responsive Notes

- Desktop reference: 1440 x 900, max content width 1152 px on the index and 1024 px on the detail page.
- Tablet reference: masonry reduces to 2 columns at 768 px.
- Mobile reference: 390 x 844, one-column index with 8 px gutters; detail content stacks and the YouTube frame becomes 368 x 207.
- Reduced-motion implementation should keep posters visible and avoid autoplay/scale animation.

