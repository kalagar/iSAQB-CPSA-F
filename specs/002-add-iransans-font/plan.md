# Implementation Plan: IranSans Font for Farsi Pages

**Branch**: `002-add-iransans-font` | **Date**: 2026-09-03 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-add-iransans-font/spec.md`

## Summary

Self-host the IranSans font for the site's Farsi (`.fa.html`) pages by trimming the
dropped `WebFonts/` kit down to the four font weights and two formats the pages
actually need, moving those into a permanent `fonts/` folder at the project root,
wiring them up via `@font-face` + a `font-family` stack update on the Farsi pages,
and deleting everything else the kit brought with it (demo page, preview image,
unused weights, legacy formats).

## Technical Context

**Language/Version**: N/A — static HTML/CSS/vanilla JS site, no runtime/build language

**Primary Dependencies**: None — self-hosted `@font-face` only, no CDN, no bundler (required by Constitution Principle III)

**Storage**: N/A (static font files on disk)

**Testing**: Manual visual/browser verification — this content-only repo has no automated test suite (per constitution's Review Workflow)

**Target Platform**: Static HTML opened directly in a browser or served from any static host

**Project Type**: Static content site (flat file layout, not a src/tests app)

**Performance Goals**: Keep the font payload minimal — only the weights/formats actually referenced, so Farsi pages stay light and fast to open as single files

**Constraints**: Self-contained and offline-readable (Constitution Principle III: no required CDN dependency); no build step

**Scale/Scope**: 2 existing Farsi pages (`index.fa.html`, `isaqb-cpsa-f-day-01.fa.html`) today; folder/CSS setup must extend cleanly to future `.fa.html` day pages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle II (Consistent Daily Structure)** — PASS. Only a `<link>` and a `font-family` value are added to each Farsi page's existing `<head>`/style block; no structural reordering. Future `.fa.html` pages must copy the same two additions to stay consistent.
- **Principle III (Self-Contained Static Pages)** — PASS. Fonts are self-hosted from a project folder, not a CDN, so pages stay readable offline. This is the primary driver of the design.
- No other principles apply to a font-asset change. No violations — Complexity Tracking not needed.

*Post-Phase 1 re-check*: Design (below) keeps the same conclusion — PASS, no new dependencies or structural drift introduced.

## Project Structure

### Documentation (this feature)

```text
specs/002-add-iransans-font/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit-tasks — not created here)
```

### Source Code (repository root)

```text
fonts/                        # NEW — permanent home for the trimmed font kit
├── iransans.css               # @font-face declarations (trimmed from WebFonts/css/fontiran.css)
├── woff2/
│   ├── IRANSansWeb.woff2
│   ├── IRANSansWeb_Medium.woff2
│   ├── IRANSansWeb_Bold.woff2
│   └── IRANSansWeb_Black.woff2
└── woff/
    ├── IRANSansWeb.woff
    ├── IRANSansWeb_Medium.woff
    ├── IRANSansWeb_Bold.woff
    └── IRANSansWeb_Black.woff

index.fa.html                 # MODIFIED — add <link> to fonts/iransans.css + IranSans in font-family
isaqb-cpsa-f-day-01.fa.html   # MODIFIED — same two additions

WebFonts/                     # REMOVED entirely once the above is in place
```

**Structure Decision**: Flat static site — no `src/`/`tests/` split applies. A single
new `fonts/` folder at the project root (mirroring the `woff2`/`woff` sub-layout the
kit already used) is the natural, lowest-friction location: every existing page lives
at the project root and already references sibling files (`lang-switch.js`) by a bare
relative path, so `fonts/...` stays consistent with that convention.

## Complexity Tracking

*No violations — table not needed.*
