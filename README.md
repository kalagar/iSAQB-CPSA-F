# iSAQB CPSA-F

A static 22-day course site for the iSAQB CPSA-Foundation Level certification, in English and Farsi.

## Structure

- `index.html` — redirects to `content/EN/index.html`
- `content/EN/` — English lessons (`isaqb-cpsa-f-day-01.html` … `day-22.html`)
- `content/FA/` — Farsi lessons (`*.fa.html`), RTL
- `style.css` — shared stylesheet
- `lang-switch.js` — EN/FA language toggle
- `fonts/` — IRAN Sans-Serif (used on FA pages)

## Running locally

No build step. Serve the directory and open it in a browser:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
