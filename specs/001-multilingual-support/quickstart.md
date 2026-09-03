# Quickstart: Validating Multilingual Support

No build step or server is required — this is a static site. Validate by
opening the files directly in a browser (or via any simple static file
server, e.g. `python3 -m http.server`).

## Prerequisites

- The feature implemented per `plan.md` / `contracts/page-variant-contract.md`:
  `index.html` + `index.fa.html`, and `isaqb-cpsa-f-day-01.html` +
  `isaqb-cpsa-f-day-01.fa.html` present; Days 2–10 have the switcher wired
  with the Farsi option disabled.

## Scenario 1 — Switch to Farsi and back (User Story 1)

1. Open `index.html` in a browser.
2. Click the Farsi option in the language switcher.
3. **Expect**: URL changes to `index.fa.html`; page text is in Farsi; page
   direction is right-to-left (`<html lang="fa" dir="rtl">`); this happens
   with no perceptible delay (SC-001).
4. Click the English option.
5. **Expect**: back on `index.html`, left-to-right, English text.

## Scenario 2 — Preference follows navigation and reload (User Story 2)

1. From `index.fa.html`, click through to Day 1's link.
2. **Expect**: lands on `isaqb-cpsa-f-day-01.fa.html` directly (not the
   English file first).
3. Close the tab, reopen `index.html` fresh (typed URL, not a bookmark of
   the `.fa.html` file).
4. **Expect**: auto-redirected to `index.fa.html` because the stored
   preference is `fa` (SC-003).

## Scenario 3 — Untranslated page shows its state honestly (Edge case / FR-007)

1. With the language preference set to Farsi, navigate to
   `isaqb-cpsa-f-day-02.html`.
2. **Expect**: page loads in English (no `.fa.html` sibling exists yet), and
   the switcher's Farsi option is visibly disabled/labeled "not yet
   translated" rather than silently pretending to be Farsi.

## Scenario 4 — Progress tracking survives a language switch (User Story 3)

1. On `index.html`, mark Day 1 as done using the existing tracker.
2. Switch to Farsi (`index.fa.html`).
3. **Expect**: Day 1 still shows as done.

## Scenario 5 — Works without `localStorage` (Edge case)

1. Open the site in a private/incognito window with storage blocked (or via
   browser devtools, disable storage for the site).
2. Use the language switcher on any page.
3. **Expect**: the switch still works for the current page view; it simply
   won't be remembered on the next navigation — no error, no broken page.

## Scenario 6 — Mixed-direction inline terms render legibly (Edge case / FR-006)

1. On `index.fa.html` or `isaqb-cpsa-f-day-01.fa.html`, locate a line
   containing an untranslated acronym (e.g., "iSAQB", "CPSA-F").
2. **Expect**: the acronym reads left-to-right inline within the
   surrounding right-to-left Farsi sentence, not reversed or garbled.

## Native-reader review (SC-004)

Have a native Farsi reader read `index.fa.html` and
`isaqb-cpsa-f-day-01.fa.html` end-to-end and confirm reading order, grammar,
and terminology are correct — this cannot be verified by an automated or
English-speaking check alone.
