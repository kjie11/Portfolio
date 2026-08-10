# Ruyan Qin Technical Portfolio

A bilingual technical portfolio inspired by the structure and interaction patterns of `xrarchitect.xyz/project/2`, populated with Ruyan Qin's verified game, XR, and embodied-interaction work.

## Run locally

```powershell
npm install
npm run dev
```

Open the `/technical/` route shown by Vite. The root route redirects there automatically.

## Verify

```powershell
npm run build
$env:PORTFOLIO_URL='http://127.0.0.1:5173/technical/'
python scripts/test_technical_portfolio.py
```

The Playwright test covers desktop and mobile layouts, card interaction, project routing, media state, and horizontal overflow. Screenshots are saved in `output/qa/`.

## Content notes

- Eleven projects use bilingual descriptions and real preview media from the source portfolios.
- The six legacy XR/game projects retain their original YouTube proof links; Abyss also includes three supporting images.
- Gothic Hunter includes a local runtime video. Four newer projects retain explicit video placeholders until real project video URLs are supplied.
- AI assistance is disclosed in the interface; product judgment, interaction decisions, and final acceptance remain attributed to Ruyan Qin.
