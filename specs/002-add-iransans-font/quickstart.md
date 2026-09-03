# Quickstart: Validate IranSans on Farsi Pages

## Prerequisites

- Implementation done: `fonts/` folder exists at project root with
  `iransans.css`, `woff2/`, `woff/` (see [data-model.md](./data-model.md) for
  the exact file list and [contracts/font-face-contract.md](./contracts/font-face-contract.md)
  for the `@font-face` mapping).
- `WebFonts/` drop folder has been removed.
- `index.fa.html` and `isaqb-cpsa-f-day-01.fa.html` each link `fonts/iransans.css`
  and list `IRANSans` first in their `font-family`.

## Validate rendering (User Story 1)

1. Open `index.fa.html` directly in a browser (double-click the file — no
   server needed, per the site's self-contained design).
2. Open browser devtools → Elements → select the `<body>` → check Computed
   styles → `font-family` should resolve to `IRANSans`.
3. Repeat for `isaqb-cpsa-f-day-01.fa.html`.
4. Confirm Persian glyphs render with proper joining/shaping (no boxes, no
   obviously-wrong Latin-style fallback rendering).

**Expected outcome**: Both pages show Persian text set in IranSans.

## Validate offline/self-hosting (User Story 1, scenario 2)

1. Disconnect from the network (or use devtools' offline mode).
2. Reload `index.fa.html`.
3. Confirm IranSans still renders (proves no CDN dependency).

## Validate cleanup (User Story 2)

1. `ls fonts/woff2 fonts/woff` — should show exactly 4 files each (Regular,
   Medium, Bold, Black), no Light/UltraLight/ttf/eot.
2. Confirm `WebFonts/` no longer exists in the project.
3. Confirm no page references a path under `WebFonts/`.

## Validate fallback (FR-005 / SC-004)

1. Temporarily rename or block one of the `fonts/woff2/*.woff2` files.
2. Reload the affected Farsi page.
3. Confirm text is still fully visible (browser falls through to `woff`, then
   to the next stack entry) — no invisible/missing text.
4. Restore the file afterward.
