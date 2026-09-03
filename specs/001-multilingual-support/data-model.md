# Data Model: Multilingual Support (English & Farsi)

This feature has no database or backend; "data" here means the browser-local
state and the file-level content structure the design depends on.

## Language Preference

Stored client-side in `localStorage`.

| Field | Type | Values | Notes |
|-------|------|--------|-------|
| key | string constant | `isaqb-cpsaf-lang` | Namespaced like the existing progress-tracker key (`isaqb-cpsaf-progress`) to avoid collision |
| value | string enum | `en` \| `fa` | Absent/invalid → treated as `en` (default) |

**Rules**:
- Written whenever the learner uses the language switcher.
- Read on every page load to decide whether to auto-redirect to the
  matching-language variant of the current page (only if that variant
  exists; see Page Variant below).
- If `localStorage` is unavailable (e.g., blocked by the browser), the
  preference simply isn't persisted; the current page still renders and the
  switcher still works for that single view (FR-004 edge case).

## Page Variant

Each logical page in the guide (the landing page, and each of the 10 day
pages) is a **page family** with up to two **variants**.

| Field | Description |
|-------|-------------|
| `family_id` | Logical page identity, e.g. `index`, `day-01` … `day-10` |
| `en_file` | English file path, e.g. `index.html`, `isaqb-cpsa-f-day-01.html` (always exists) |
| `fa_file` | Farsi file path, e.g. `index.fa.html`, `isaqb-cpsa-f-day-01.fa.html` (exists only when translated) |
| `translated` | Derived: `true` if `fa_file` exists on disk, else `false` |

**Rules** (derived from FR-001, FR-002, FR-003, FR-007, and the resolved
scope decision):
- Every family MUST have an `en_file`.
- `index` and `day-01` MUST have an `fa_file` as part of this feature.
- `day-02` … `day-10` MUST NOT silently claim `translated = true`; until a
  real `fa_file` is added, their switcher shows the disabled "not yet
  translated" state.
- Each `fa_file` MUST declare `<html lang="fa" dir="rtl">`; each `en_file`
  MUST declare `<html lang="en" dir="ltr">`.
- Both variants of a family MUST use the same day-completion identifier(s)
  so the Progress State (below) is shared between them.

## Progress State (existing, unchanged)

The guide's existing per-day "done" tracker, already implemented via
`localStorage` under the key `isaqb-cpsaf-progress` (see `index.html`).
This feature does not change its schema —
it only requires (FR-005) that the identifiers it keys on are identical
across a page family's English and Farsi variants, so marking a day done in
one language shows as done in the other.
