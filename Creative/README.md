# Low-fi Portfolio Prototype

Open `index.html` directly in a browser to review the current portfolio structure and interactions. The XR section uses a lightweight mouse-parallax fallback in `file://` previews.

To run the real Three.js panorama skybox locally, serve the folder over HTTP:

```powershell
python -m http.server 8766
```

Then open `http://127.0.0.1:8766/index.html`. Immersive WebXR requires a compatible headset/browser and a secure context (`localhost` or HTTPS).

Included in this prototype:

- Compact introduction and role carousel
- Body-as-interface polaroid browsing sequence
- Reversible project-to-sidebar stacking transitions
- Section-aware previous-work navigation
- Tear-revealed 360° panorama skybox with mouse look and WebXR handoff
- Homepage and project-detail wireframes

This folder is intentionally isolated from the existing portfolio pages so it can be reviewed before integration.
