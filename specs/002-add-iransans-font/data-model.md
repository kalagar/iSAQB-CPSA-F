# Phase 1 Data Model: IranSans Font for Farsi Pages

This feature has no application data/state — it's a static asset integration.
The two "entities" from the spec are files and page markup, captured here as
their concrete on-disk/in-page shape.

## Font Asset

The trimmed IranSans font family, self-hosted under `fonts/`.

| Weight name | CSS `font-weight` | woff2 file                     | woff file                      |
|-------------|--------------------|---------------------------------|----------------------------------|
| Regular     | 400 (normal)       | `woff2/IRANSansWeb.woff2`        | `woff/IRANSansWeb.woff`          |
| Medium      | 500                | `woff2/IRANSansWeb_Medium.woff2` | `woff/IRANSansWeb_Medium.woff`   |
| Bold        | 700                | `woff2/IRANSansWeb_Bold.woff2`   | `woff/IRANSansWeb_Bold.woff`     |
| Black       | 900                | `woff2/IRANSansWeb_Black.woff2`  | `woff/IRANSansWeb_Black.woff`    |

Validation rules (from spec FR-003/FR-004):
- No other weight or format may exist under `fonts/` once integration is done.
- Every file listed above must be referenced by an `@font-face` rule in `fonts/iransans.css` — an unreferenced file is a validation failure.

## Language Page

A `.fa.html` page after this change carries two additive attributes relative
to before:

| Attribute | Before | After |
|---|---|---|
| `<head>` stylesheet links | (none for fonts) | `<link rel="stylesheet" href="fonts/iransans.css">` |
| Body `font-family` stack | `Inter, ui-sans-serif, ...` | `IRANSans, Inter, ui-sans-serif, ...` |

State transition: N/A — this is a one-time markup addition per page, not a
runtime state machine. Any future `.fa.html` page is expected to be created
with both attributes already present (per constitution Principle II).

English (`lang="en"`) pages are explicitly out of scope and receive no
changes.
