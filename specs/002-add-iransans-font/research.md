# Phase 0 Research: IranSans Font for Farsi Pages

No `NEEDS CLARIFICATION` markers were left in the Technical Context — this is a
small, self-contained asset change with no external dependency choices. The
items below record the concrete decisions the plan depends on.

## Decision: Which font formats to keep

**Decision**: Keep `woff2` (primary) and `woff` (fallback). Drop `ttf` and `eot`.

**Rationale**: `woff2` is supported by every browser in current/recent use and
gives the smallest file size; `woff` covers the small remaining gap of older-but-
still-encountered browsers. `eot` exists only for legacy Internet Explorer and
`ttf` is uncompressed and redundant once `woff`/`woff2` are present. The project
has no stated requirement to support IE (constitution targets learners on
current browsers/devices).

**Alternatives considered**: Keep all four formats (rejected — directly
contradicts spec FR-003's "only files actually referenced" and doubles the
kept file count for zero practical benefit); keep only `woff2` (rejected — a
single-format fallback chain is one line of CSS and meaningfully widens
compatibility for negligible size cost).

## Decision: Which font weights to keep

**Decision**: Keep 4 of the kit's 6 weights: Regular (400), Medium (500), Bold
(700), Black (900). Drop Light (300) and UltraLight (200).

**Rationale**: Grepping the current Farsi pages' CSS for `font-weight` turns up
exactly `400` (default body text), `600` (used twice), `700`, and `800`. The
kit does not ship 600 or 800 weights, so each is served by the browser's
native font-weight matching against the nearest registered weight (600 →
Medium/Bold neighbors, 800 → Black) — this is standard CSS font matching
behavior, not something the project needs to implement. No page uses 200 or
300, so those two weights are unreferenced dead weight per FR-003.

**Alternatives considered**: Keep all 6 weights "just in case" (rejected —
directly contradicts FR-003 and the spec's Assumptions, which scope
"necessary" to what's actually used); add exact 600/800 weight files by
relabeling existing files (rejected — there is no distinct 600 or 800 master
in the kit to relabel from, and CSS's native nearest-weight matching already
produces an acceptable visual result, per platform-native rung of the
solution ladder).

## Decision: Where the trimmed kit lives

**Decision**: New root-level `fonts/` folder, containing `iransans.css` plus
`woff2/` and `woff/` subfolders — mirroring the sub-layout the original kit
already used, minus the dropped `ttf`/`eot`/weights.

**Rationale**: Every page in this repo lives at the project root and already
references sibling assets via bare relative paths (e.g. `<script
src="lang-switch.js">`). A root-level `fonts/` folder is the lowest-friction
placement consistent with that existing convention, and reusing the kit's own
`woff2`/`woff` subfolder naming means the trimmed `iransans.css`'s `url(...)`
paths need only a `../` prefix change, not a rewrite.

**Alternatives considered**: Nest under a `css/`or `assets/` folder (rejected
— no such folder exists in the project today; inventing one adds a layer of
structure the flat site doesn't otherwise have, for a single font asset).

## Decision: How pages pick up the font

**Decision**: Each `.fa.html` page adds one `<link rel="stylesheet"
href="fonts/iransans.css">` in `<head>`, and prepends `IRANSans` to that page's
existing `font-family` stack (e.g. `IRANSans, Inter, ui-sans-serif, ...`).

**Rationale**: Keeps the existing fallback chain intact per spec FR-005 (if
IranSans fails to load, the already-present fallbacks still apply) and needs
no restructuring of the pages' existing inline `<style>` blocks — matching
constitution Principle II's requirement not to disrupt each day page's shared
structural skeleton.

**Alternatives considered**: Inline the `@font-face` rules directly into each
page's `<style>` block instead of a linked stylesheet (rejected — duplicates
the same ~30 lines across every current and future Farsi page; a single
shared stylesheet is the smaller, DRY-er diff and is still just as
self-contained/offline-capable as inlining).

## Decision: License/attribution notice

**Decision**: Carry the kit's existing license header comment (already at the
top of `WebFonts/css/fontiran.css`) forward verbatim into the new
`fonts/iransans.css`.

**Rationale**: Satisfies spec FR-006 with zero added ceremony — the notice
already exists in exactly the file being trimmed and relocated.

**Alternatives considered**: A separate `LICENSE`/`NOTICE` file (rejected —
unnecessary extra file for a notice that already lives correctly attached to
the CSS it governs).
