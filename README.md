DeepThought Learning — Prototype
================================

Overview
--------
This repository contains a compact, production-minded front-end prototype for a psychology-driven EdTech landing page. It demonstrates how JSON-driven content can be rendered into a responsive, accessible interface using plain HTML, CSS and JavaScript.

Key features
------------
- Responsive card grid populated from JSON
- Search, tag-based filtering and sorting controls
- Accessible detail modal on card click
- Sign In / Sign Up modals (client-side demo only)

Run locally
-----------
Quick (no server):

- Double-click `index.html` to open in your browser.

Recommended (when fetching external JSON):

```powershell
cd 'C:\Users\Windows\Documents\deeptech'
python -m http.server 8000
# then open http://localhost:8000
```

Using real data
---------------
The demo uses an in-file `DATA` array in `app.js`. To use external data:

- Replace the `DATA` array directly with your JSON, or
- Serve a `data.json` file and update `app.js` to fetch it (recommended for maintainability).

Customization
-------------
- Typography, spacing and colors are defined as CSS variables in `styles.css`.
- Swap the placeholder images in `images/` with your cover art and update paths in `app.js`.

Next steps I can help with
-------------------------
- Wire authentication to a backend (Node/Express, etc.)
- Replace placeholders with production assets and exact Figma styles
- Create a `.gitignore` and provide exact Git/GitHub push commands



Thank you — open `index.html` to review the prototype.

