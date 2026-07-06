# Ravi Anumantula — Portfolio

A single-page personal portfolio. Plain HTML, CSS, and JavaScript — **no build step, no dependencies.**

## Files
- `index.html` — page structure and section content
- `styles.css` — all styling and design tokens (colors at the top under `:root`)
- `script.js` — the **Skills** and **Experience** content live here in two arrays; edit those to update them
- `assets/profile.jpg` — your photo (add it here; see below)

## View it locally
Just open `index.html` in a browser. For best results (so fonts/paths behave like production), run a tiny local server:

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

Open the folder in VS Code to edit. The "Live Server" extension gives instant reload.

## What to customize
1. **Photo** — drop a square image at `assets/profile.jpg` (keep the filename). Until you do, a clean "RA" monogram shows automatically.
2. **Links** — replace every `href="#"` placeholder in `index.html` (LinkedIn, GitHub, Medium) with your real URLs, and the `Download Résumé` link with a path to your PDF (e.g. `assets/Ravi_Anumantula_Resume.pdf`).
3. **Email** — already set to `ravianumanthula@gmail.com`; change in `index.html` if needed.
4. **Skills / Experience** — edit the `SKILLS` and `EXPERIENCE` arrays at the top of `script.js`.
5. **Colors** — change the accent and background in `:root` at the top of `styles.css`.

## Deploy (free)
- **Vercel / Netlify:** drag the whole folder onto their dashboard, or connect a GitHub repo. No settings needed — it's a static site.
- **GitHub Pages:** push the folder to a repo and enable Pages on the main branch.

## Design notes
- Type: Space Grotesk (headings) · Inter (body) · JetBrains Mono (labels/tags), via Google Fonts.
- Accent: indigo `#4F46E5`. Section labels use a code-comment style (`// about`) as a small nod to the developer subject.
- Accessible: keyboard focus, reduced-motion respected, responsive to mobile.
