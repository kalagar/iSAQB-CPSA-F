# Feature Specification: Multilingual Support (English & Farsi)

**Feature Branch**: `001-multilingual-support`

**Created**: 2026-09-03

**Status**: Draft

**Input**: User description: "I need to project become a multilingual project. for the moment Farsi and English would be ok. do I need to convert this project to a next.js project or current implementation is sufficient?"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Switch the study guide to Farsi (Priority: P1)

A Farsi-speaking learner opens any page of the study guide, switches the
language to Farsi, and can read that page's content correctly laid out
right-to-left, with navigation labels and the table of contents also in
Farsi.

**Why this priority**: This is the core value of the feature — without it,
Farsi speakers get no benefit at all. Everything else is refinement.

**Independent Test**: Open `index.html`, switch to Farsi, and confirm the
page text and layout render correctly right-to-left. Delivers value on its
own even before every day page is translated.

**Acceptance Scenarios**:

1. **Given** a page with a language switcher, **When** the learner selects
   Farsi, **Then** the page's text content is replaced with the Farsi
   translation and the layout direction switches to right-to-left.
2. **Given** a page displayed in Farsi, **When** the learner selects English,
   **Then** the page reverts to English text and left-to-right layout.

---

### User Story 2 - Language choice follows the learner across pages (Priority: P2)

A learner who selects Farsi on one page continues to see Farsi when they
navigate to another day's page or return to the site later, without having
to re-select the language every time.

**Why this priority**: A study guide is read across many sessions and pages;
re-selecting the language on every page would be a constant friction that
undermines the value delivered by User Story 1.

**Independent Test**: Select Farsi on `index.html`, navigate to a day page,
and confirm it opens already in Farsi. Reload the browser later and confirm
the choice is still remembered.

**Acceptance Scenarios**:

1. **Given** a learner selected Farsi on one page, **When** they navigate to
   another page of the guide, **Then** that page opens already in Farsi.
2. **Given** a learner selected a language previously, **When** they return
   to the site in a new browser session, **Then** their last chosen language
   is used automatically.

---

### User Story 3 - Progress tracking keeps working regardless of language (Priority: P3)

A learner who has marked days as "done" using the existing progress tracker
sees that same progress preserved when switching between English and Farsi.

**Why this priority**: Lower priority than the translation itself, but a
regression here (losing progress when switching languages) would damage
trust in a feature the guide already offers.

**Independent Test**: Mark a day as done in English, switch to Farsi, and
confirm the same day still shows as done.

**Acceptance Scenarios**:

1. **Given** a learner has marked days as done, **When** they switch the
   page language, **Then** the completion state of every day is unchanged.

---

### Edge Cases

- What happens when a page has not yet been translated into Farsi? The
  language switcher SHOULD still be visible, and the page SHOULD indicate
  clearly (rather than silently showing English) that a Farsi version isn't
  available yet.
- How does the layout handle mixed content, such as English technical terms,
  acronyms (e.g., "iSAQB", "CPSA-F"), or code-like text, inside an
  otherwise right-to-left Farsi page? These MUST remain readable
  left-to-right inline within the surrounding right-to-left text.
- What happens if a learner's browser blocks local storage? The language
  switcher MUST still work for the current page view, defaulting to English
  each time storage isn't available.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Every page of the study guide (the landing page and every day
  page) MUST offer a visible control to switch the displayed language
  between English and Farsi.
- **FR-002**: Switching the language MUST update all learner-facing text on
  the current page — headings, body content, navigation labels, and
  progress-tracker labels — to the selected language.
- **FR-003**: When Farsi is selected, the page layout MUST render
  right-to-left; when English is selected, the page layout MUST render
  left-to-right.
- **FR-004**: The learner's selected language MUST be remembered and applied
  automatically on subsequent page views and future visits.
- **FR-005**: The existing per-day progress tracking MUST continue to work
  identically regardless of which language is displayed.
- **FR-006**: Inline technical terms, acronyms, and proper nouns that are not
  translated MUST remain legibly left-to-right even within right-to-left
  Farsi text.
- **FR-007**: If a specific page's Farsi translation is not yet available,
  the page MUST clearly indicate this to the learner rather than silently
  displaying English content under a Farsi selection.
- **FR-008**: The landing page (`index.html`) and Day 1 MUST have complete
  Farsi translations of their existing English content as part of this
  feature. Days 2–10 MUST support the language switcher and clearly show the
  "not yet translated" state (per FR-007) until translated in follow-up work.

### Key Entities

- **Language Preference**: The learner's chosen display language
  (English or Farsi), remembered across pages and visits.
- **Page Content Translation**: The Farsi and English text for a given page,
  keyed by page and by content section, so a page can render fully in
  either language.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A learner can switch any page between English and Farsi in a
  single action, with the new language visible in under 1 second.
- **SC-002**: 100% of learner-facing text on a translated page (headings,
  body copy, navigation, progress labels) appears in the selected language
  — no mixed-language leakage on a fully translated page.
- **SC-003**: A learner's language choice, once selected, persists across
  100% of subsequent page navigations and across a new browser session on
  the same device.
- **SC-004**: Farsi pages are readable end-to-end in correct right-to-left
  reading order, as verified by a native Farsi reader.
- **SC-005**: The guide remains fully usable (openable directly in a
  browser, no install or build step) in both languages, consistent with how
  it works today.

## Out of Scope

- Translating Days 2–10 into Farsi is deferred to follow-up work after this
  feature ships the switching mechanism, RTL layout, and the landing page +
  Day 1 as the initial translated content.

## Assumptions

- The project's existing constitution (Principle III: Self-Contained Static
  Pages) requires no build step, bundler, or framework — so this feature is
  scoped to plain HTML/CSS/JavaScript. **A framework migration (e.g., to
  Next.js) is not required or planned for this feature**; the current static
  implementation is sufficient to support two languages and a right-to-left
  layout.
- English remains the source of truth for content; Farsi is a translation of
  the same material rather than an independently authored track.
- "Learner-facing text" includes page titles, headings, body content,
  navigation links, and the progress tracker's UI labels, but not developer
  comments or metadata invisible to the reader.
- Only English and Farsi are in scope for now; the design should not
  preclude adding further languages later, but supporting more than two is
  out of scope for this feature.
- A learner's language preference is device/browser-local (e.g., remembered
  via the browser), not tied to an account, since the site has no accounts
  or backend today.
