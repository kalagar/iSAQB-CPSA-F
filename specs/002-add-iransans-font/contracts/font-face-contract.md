# Contract: `fonts/iransans.css` @font-face mapping

This is the interface between the font files on disk and every page that
consumes them (current and future `.fa.html` pages). Any change to the kept
files or weights must update this table and vice versa.

```text
font-family: 'IRANSans';

font-weight 400 (normal) → woff2/IRANSansWeb.woff2, woff/IRANSansWeb.woff
font-weight 500          → woff2/IRANSansWeb_Medium.woff2, woff/IRANSansWeb_Medium.woff
font-weight 700 (bold)   → woff2/IRANSansWeb_Bold.woff2, woff/IRANSansWeb_Bold.woff
font-weight 900          → woff2/IRANSansWeb_Black.woff2, woff/IRANSansWeb_Black.woff

src order per weight: woff2 first, woff second (browser picks first supported format)
font-style: normal for all four (kit ships no italic)
```

## Consumer contract

Any page that wants IranSans MUST:
1. Load `<link rel="stylesheet" href="fonts/iransans.css">` in `<head>`.
2. Include `IRANSans` as the first entry in its `font-family` value, followed
   by its existing fallback stack (never IranSans alone — satisfies spec
   FR-005).

## Verification

- Every `url(...)` path in `fonts/iransans.css` resolves to an existing file
  under `fonts/woff2/` or `fonts/woff/`.
- No `@font-face` rule references a weight outside {400, 500, 700, 900}.
- No file exists under `fonts/` that isn't referenced by some `@font-face`
  rule in this stylesheet.
