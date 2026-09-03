# Implementation Plan: Multilingual Support (English & Farsi)

**Branch**: `001-multilingual-support` | **Date**: 2026-09-03 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-multilingual-support/spec.md`

## Summary

Add a Farsi/English language switcher to every page of the static study
guide. Each page gets an optional right-to-left Farsi variant file
(`*.fa.html`) alongside its existing English file; a small inline script
persists the learner's language choice in `localStorage` and auto-redirects
between variants on navigation. This feature delivers the switching
mechanism, RTL layout, and persistence across all 11 pages, with the landing
page and Day 1 fully translated now; Days 2–10 show a clearly-labeled
"not yet translated" state until translated in follow-up work. No framework
or build step is introduced — the existing plain-HTML/CSS/JS, no-build
architecture is sufficient.

## Technical Context

**Language/Version**: HTML5, CSS3, vanilla JavaScript (browser-native ES,
no transpilation)

**Primary Dependencies**: None — no npm, bundler, or framework, per
Constitution Principle III

**Storage**: Browser `localStorage` — new key `isaqb-cpsaf-lang` alongside
the existing `isaqb-cpsaf-progress` key

**Testing**: Manual browser validation only (see `quickstart.md`), matching
the constitution's Review Workflow — no automated test suite exists for
this content repository

**Target Platform**: Any modern browser; files opened directly or served
statically, no server-side logic

**Project Type**: Single static multi-page site

**Performance Goals**: Language switch reflected in under 1 second (SC-001)
— trivially met since it's a plain page navigation, no async work

**Constraints**: No build step (Constitution III); must not require
JavaScript to render either language correctly; must degrade gracefully with
`localStorage` unavailable (FR-004 edge case); must not alter the existing
progress-tracker's stored data or keys (FR-005)

**Scale/Scope**: 11 page families (`index` + 10 days); 2 languages; this
feature ships translated Farsi content for 2 of the 11 families (`index`,
`day-01`); the remaining 9 get the switcher wired in a "not yet translated"
state

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Result |
|-----------|-------|--------|
| I. Curriculum Fidelity | Farsi content is a translation of already-reviewed English source, not new claims | PASS |
| II. Consistent Daily Structure | Switcher + on-load script added identically to all 11 pages via the same contract (`contracts/page-variant-contract.md`); `index.html` stays the single source of navigation | PASS |
| III. Self-Contained Static Pages | No build step, bundler, or framework; per-language variants are plain static files; core rendering needs no JS | PASS |
| IV. Accuracy Over Completeness | Untranslated pages (Days 2–10) are explicitly flagged as not-yet-translated, never silently shown as complete Farsi (FR-007) | PASS |
| V. Plain-Language Clarity | Translation must preserve plain-language clarity in Farsi; verified via native-reader review in `quickstart.md` (SC-004) | PASS (verification step defined) |

No violations. Complexity Tracking table is not needed.

*Post-design re-check (after Phase 1 artifacts below): unchanged — the file-
variant approach in `research.md`/`contracts/page-variant-contract.md`
introduces no new dependency, build step, or structural inconsistency.*

## Project Structure

### Documentation (this feature)

```text
specs/001-multilingual-support/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md         # Phase 1 output
├── contracts/
│   └── page-variant-contract.md
└── tasks.md              # Phase 2 output (/speckit-tasks — not created here)
```

### Source Code (repository root)

The repository has no `src/`/`tests/` split — it's a flat set of static HTML
files at the root, per the existing constitution-mandated structure. This
feature adds Farsi sibling files next to the English ones it translates,
following the naming contract in `contracts/page-variant-contract.md`:

```text
index.html                      # existing, gets switcher + on-load script
index.fa.html                   # new: Farsi translation of index.html

isaqb-cpsa-f-day-01.html        # existing, gets switcher + on-load script
isaqb-cpsa-f-day-01.fa.html     # new: Farsi translation of day 1

isaqb-cpsa-f-day-02.html … isaqb-cpsa-f-day-10.html
                                 # existing, get switcher + on-load script
                                 # (Farsi option disabled — no .fa.html yet)
```

**Structure Decision**: Single static project, no `src`/`frontend`/`backend`
split (none exists today and this feature doesn't need one). Each
translated page is a sibling `.fa.html` file next to its English source,
per `contracts/page-variant-contract.md`; untranslated pages get the same
switcher markup and on-load script with the Farsi option disabled, keeping
all 11 pages structurally consistent per Constitution Principle II.

## Complexity Tracking

*No Constitution Check violations — this table is not needed.*
