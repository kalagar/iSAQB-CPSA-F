# Research: Multilingual Support (English & Farsi)

## Decision: Per-language static file variants, not a client-side templating layer

**Decision**: Each page ships as separate static HTML files per language
(e.g., `index.html` / `index.fa.html`, `isaqb-cpsa-f-day-01.html` /
`isaqb-cpsa-f-day-01.fa.html`), rather than one HTML file with a JSON
translation dictionary and JavaScript that swaps text content at runtime.

**Rationale**: The constitution's Principle III requires no build step or
framework, and the site already follows a one-file-per-day pattern. Two
languages don't justify a runtime i18n templating layer — that's exactly the
kind of speculative infrastructure the constitution's YAGNI rationale warns
against (Principle III: "introducing a build pipeline adds friction with no
pedagogical benefit"). A translated file is trivially reviewable side-by-side
with its English source, needs no JS to render correctly (works with
JavaScript disabled), and lets `<html lang="fa" dir="rtl">` handle
right-to-left layout natively per FR-003 with zero script.

**Alternatives considered**:
- *Single-file + JSON dictionary + DOM swap*: rejected — requires tagging
  every text node with a translation key, a JS runtime to swap `dir`/text on
  every page, and keeps content authors from just reading/writing plain
  Farsi HTML. More moving parts for no benefit at 2 languages.
- *Path-based locales (`/en/`, `/fa/` folders)*: rejected — the project has
  no server routing; it's opened as flat files or via basic static hosting,
  so folder-based locale routing adds structure with no payoff over a file
  suffix.

## Decision: Language preference stored under a dedicated `localStorage` key

**Decision**: A learner's chosen language is stored under its own
`localStorage` key (`isaqb-cpsaf-lang` — namespaced like the guide's existing
progress key so it can't collide with it), separate from the existing
`isaqb-cpsaf-progress` day-completion key used by the progress tracker.

**Rationale**: FR-004 requires persistence across pages and visits, and FR-005
requires that switching languages never touches progress data. Keeping the
two keys independent guarantees no accidental interaction, and reusing
`localStorage` (already relied on by the existing per-day tracker) needs no
new dependency.

**Alternatives considered**:
- *URL query parameter*: rejected as the sole mechanism — doesn't persist
  across a fresh visit without a bookmark, failing SC-003.
- *Cookies*: rejected — no server exists to read them; `localStorage` is
  already the guide's established mechanism and sufficient for a
  same-device, no-account use case (see spec Assumptions).

## Decision: On-page language switcher redirects between variant files and sets the preference

**Decision**: The switcher is a small link/control present on every page
(index + all 10 days) that navigates to that page's counterpart file and
writes the preference; a small inline script on each page checks the stored
preference on load and redirects once to the matching variant if the
learner arrived at the "wrong" language file directly (e.g., via a bookmark
or search result) and a matching variant exists.

**Rationale**: Satisfies FR-001/FR-002 (visible control, updates all
learner-facing text via loading the actual translated file) and the
cross-page persistence in User Story 2 without any content templating.

**Alternatives considered**:
- *No auto-redirect, switcher only*: rejected — would violate FR-004 for the
  "navigate to another page" scenario, since arriving at
  `isaqb-cpsa-f-day-02.html` fresh wouldn't reflect a previously chosen
  Farsi preference until the learner manually re-switches.

## Decision: "Not yet translated" is a disabled/labeled switcher state, not a silent fallback

**Decision**: For pages without a `.fa.html` counterpart (Days 2–10 initially,
per the resolved scope), the language switcher's Farsi option is shown but
marked unavailable (e.g., grayed with a "Farsi coming soon" label) instead of
linking anywhere, and it never auto-redirects into English while claiming to
be Farsi.

**Rationale**: Directly required by FR-007 and Constitution Principle IV
(Accuracy Over Completeness) — an incomplete state must be visible, never
silently presented as complete.

**Alternatives considered**:
- *Machine-translate missing pages on the fly*: rejected — out of scope
  (spec assumes English is the reviewed source of truth; unreviewed machine
  translation would violate Principle I, Curriculum Fidelity, and Principle
  IV).

## Decision: Validation is manual, browser-based checks — no automated test suite

**Decision**: This feature is validated via a manual quickstart checklist
(see `quickstart.md`), consistent with the constitution's Review Workflow
("no automated test suite for this content-only repository; review is
manual").

**Rationale**: Matches existing project practice; adding a test runner/
framework would itself require build tooling the constitution rules out.

**Alternatives considered**:
- *Add a headless-browser test script*: rejected as unnecessary tooling for
  a static-content repo with no existing test infrastructure — revisit only
  if the guide later adds real interactive logic beyond the switcher and
  progress tracker.
