# Contract: Page Language Variant

This is the internal structural contract every HTML page in the guide (the
landing page and every day page) must satisfy, so the language switcher and
persistence behave identically across all 11 pages regardless of translation
status. There is no external API for this feature — this document is the
contract between page authors/translators and the shared switcher behavior.

## File naming

- English (default, always present): existing filename unchanged, e.g.
  `index.html`, `isaqb-cpsa-f-day-01.html`.
- Farsi (present only once translated): same name with a `.fa` suffix before
  the extension, e.g. `index.fa.html`, `isaqb-cpsa-f-day-01.fa.html`.

## Required `<html>` attributes per variant

| Variant | `lang` | `dir` |
|---------|--------|-------|
| English file | `en` | `ltr` |
| Farsi file | `fa` | `rtl` |

## Required switcher element (every page, both variants)

Every page MUST include a switcher control with:

- A link/action to the English variant, always enabled.
- A link/action to the Farsi variant:
  - **Enabled**, pointing at the sibling `.fa.html` file, when it exists.
  - **Disabled with a "not yet translated" label**, and not a functioning
    link, when it does not exist (Days 2–10 initially).
- Selecting either option writes the `isaqb-cpsaf-lang` preference (see
  `data-model.md`) before/while navigating.

## Required on-load check (every page, both variants)

Each page includes a small inline script that:

1. Reads `isaqb-cpsaf-lang` from `localStorage` (tolerating it being absent
   or inaccessible — see edge case in `data-model.md`).
2. If the stored preference doesn't match the current variant AND the
   matching-language sibling file exists, redirects once to that sibling.
3. Never redirects toward a sibling that doesn't exist.

## Shared identifiers

Both variants of a page family MUST use the same day-completion
identifier(s) that the existing progress tracker in `index.html` keys on, so
`isaqb-cpsaf-progress` state is shared regardless of displayed language.

## Compliance checklist per page family

- [ ] English file has `lang="en" dir="ltr"`
- [ ] Farsi file (if present) has `lang="fa" dir="rtl"`
- [ ] Switcher present on both variants, Farsi option enabled only if the
      sibling file exists
- [ ] On-load redirect script present and matches the rules above
- [ ] Day-completion identifiers match between variants
