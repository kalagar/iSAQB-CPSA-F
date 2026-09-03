# Feature Specification: IranSans Font for Farsi Pages

**Feature Branch**: `002-add-iransans-font`

**Created**: 2026-09-03

**Status**: Draft

**Input**: User description: "make sure you are using IranSans font for the Farsi language. I will put the fonts folder in the root of the project. you should put necessary files in the proper folder and then remove the rest."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Farsi pages render in IranSans (Priority: P1)

A Farsi-reading learner opens a `.fa.html` page and reads Persian text set in the IranSans typeface, which is designed for Persian script, instead of a fallback font that was never intended for Farsi.

**Why this priority**: This is the entire point of the feature — without it, nothing changes for the reader.

**Independent Test**: Open `index.fa.html` and `isaqb-cpsa-f-day-01.fa.html` in a current browser and confirm the rendered Persian text uses IranSans (inspect computed `font-family`), not the previous fallback stack.

**Acceptance Scenarios**:

1. **Given** a Farsi page is opened in a current browser, **When** the page finishes loading, **Then** Persian body and heading text is displayed in IranSans.
2. **Given** the page is opened offline (no network access), **When** it loads, **Then** IranSans still renders because the font is served from within the project, not a CDN.

---

### User Story 2 - Repository only keeps the font files actually used (Priority: P2)

The maintainer drops the full downloaded IranSans web-font kit (demo page, preview image, license file, and four font formats) into the project root. After integration, the repository contains only the font files the site actually loads, placed in a proper project folder — the rest of the drop is gone.

**Why this priority**: Keeps the repository clean and avoids shipping an unused proprietary asset dump; secondary to the visual result in User Story 1.

**Independent Test**: After integration, list the project tree and confirm no demo HTML, preview image, or unused font-kit files remain, and that the retained font files live under a clearly named project folder rather than the ad-hoc drop folder.

**Acceptance Scenarios**:

1. **Given** the font kit has been dropped into the project root, **When** integration is complete, **Then** only the font file formats actually referenced by the site's CSS remain, under a permanent project folder.
2. **Given** integration is complete, **When** the original drop folder is removed, **Then** the Farsi pages still render in IranSans (nothing they depend on lived only in the removed folder).

---

### Edge Cases

- What happens if a visitor's browser can't load the primary font format? Text must still fall back to a readable, Persian-capable font rather than showing empty boxes or unstyled text.
- What happens on the English (non-`.fa.html`) pages? They are unaffected and keep their current font.
- What happens if a Farsi page is added later? It is expected to follow the same font setup as the existing Farsi pages (per the project's existing requirement to keep day pages structurally consistent).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Every Farsi-language page (`index.fa.html`, `isaqb-cpsa-f-day-01.fa.html`, and any future `.fa.html` page) MUST render its Persian body and heading text in the IranSans font family.
- **FR-002**: The IranSans font files MUST be served from within the project itself (self-hosted), not from an external CDN, so Farsi pages remain readable without a network connection.
- **FR-003**: Only the font files and formats actually referenced by the site's styling MUST remain in the repository; the font kit's demo HTML page, preview image, and any unreferenced font formats MUST be removed.
- **FR-004**: The retained font files MUST live under one clearly named, permanent project folder rather than the temporary drop folder the kit arrived in, and that drop folder MUST be removed once the needed files have been relocated.
- **FR-005**: If the primary font format fails to load in a visitor's browser, the page MUST still display readable Persian text via a fallback font.
- **FR-006**: The font's licensing/attribution notice MUST be preserved somewhere in the repository, since the font kit is distributed as commercial/proprietary software under its own usage terms.

### Key Entities

- **Font Asset**: The IranSans font family as shipped in the kit — one or more weights, each available in several file formats (e.g., modern and legacy web font formats). Only the formats/weights the site references are kept.
- **Language Page**: A site page distinguished by its `.fa.html` (Farsi) vs. default (English) naming; only Farsi pages are in scope for this font change.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On a current browser, 100% of Farsi pages display Persian text with IranSans as the computed font, verifiable by inspecting any Farsi page's rendered styles.
- **SC-002**: After integration, the repository contains zero leftover demo/preview/license-kit files from the font drop and zero unreferenced font format files.
- **SC-003**: Deleting the original font drop folder after integration causes no visual regression on any Farsi page.
- **SC-004**: Farsi pages remain fully readable (no missing/invisible text) even when simulating a failure to load the primary font format.

## Assumptions

- Only the font formats needed for current browsers (a modern compressed web-font format, plus one broadly-compatible fallback format) are "necessary"; legacy formats aimed at very old browsers are out of scope since the project has no stated requirement to support them.
- Which specific IranSans weights are "necessary" is determined by what the existing Farsi pages' styling actually uses (or reasonably needs, e.g., a regular and a bold weight); weights not used anywhere are dropped.
- The license/attribution notice already embedded in the font kit's stylesheet comments is sufficient to satisfy the attribution requirement; no separate legal document is needed.
- No language pages other than the existing `.fa.html` pages need this font applied at this time.
