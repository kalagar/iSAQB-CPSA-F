---

description: "Task list for IranSans Font for Farsi Pages"
---

# Tasks: IranSans Font for Farsi Pages

**Input**: Design documents from `/specs/002-add-iransans-font/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/font-face-contract.md](./contracts/font-face-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Not requested in the spec. This repo has no automated test suite (per the constitution); verification is manual, via `quickstart.md`.

**Organization**: Tasks are grouped by user story (US1 = P1, US2 = P2) to match spec.md.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to

## Path Conventions

Flat static site — all paths are relative to the repository root.

---

## Phase 1: Setup

**Purpose**: Create the destination folder structure for the trimmed font kit.

- [X] T001 Create `fonts/`, `fonts/woff2/`, and `fonts/woff/` directories at the repository root

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Produce the trimmed, self-hosted font asset set that both user stories depend on. Per [data-model.md](./data-model.md), only Regular (400), Medium (500), Bold (700), and Black (900) weights, in `woff2` + `woff` formats, are needed.

**⚠️ CRITICAL**: Neither user story can be verified until this phase is complete.

- [X] T002 [P] Copy `IRANSansWeb.woff2`, `IRANSansWeb_Medium.woff2`, `IRANSansWeb_Bold.woff2`, `IRANSansWeb_Black.woff2` from `WebFonts/fonts/woff2/` into `fonts/woff2/`
- [X] T003 [P] Copy `IRANSansWeb.woff`, `IRANSansWeb_Medium.woff`, `IRANSansWeb_Bold.woff`, `IRANSansWeb_Black.woff` from `WebFonts/fonts/woff/` into `fonts/woff/`
- [X] T004 [P] Create `fonts/iransans.css` with the four `@font-face` rules from [contracts/font-face-contract.md](./contracts/font-face-contract.md) (`font-family: 'IRANSans'`, `woff2` before `woff` in each `src`), carrying forward the license/attribution header comment from `WebFonts/css/fontiran.css` verbatim

**Checkpoint**: `fonts/` now holds the complete, self-hosted, self-contained IranSans asset set — both user stories can proceed.

---

## Phase 3: User Story 1 - Farsi pages render in IranSans (Priority: P1) 🎯 MVP

**Goal**: Farsi-language pages display Persian text set in IranSans, self-hosted so it also works offline.

**Independent Test**: Open `index.fa.html` and `isaqb-cpsa-f-day-01.fa.html` in a browser, inspect the computed `font-family` on `<body>` (should be `IRANSans`), then reload with the network disabled and confirm it still renders correctly.

### Implementation for User Story 1

- [X] T005 [P] [US1] Wire IranSans into `index.fa.html`: add `<link rel="stylesheet" href="fonts/iransans.css">` in `<head>`, and prepend `IRANSans` to the existing body `font-family` stack (keep `Inter, ui-sans-serif, ...` as fallback)
- [X] T006 [P] [US1] Wire IranSans into `isaqb-cpsa-f-day-01.fa.html`: add `<link rel="stylesheet" href="fonts/iransans.css">` in `<head>`, and prepend `IRANSans` to the existing body `font-family` stack (keep `Inter, ui-sans-serif, ...` as fallback)
- [X] T007 [US1] Manually verify per [quickstart.md](./quickstart.md) "Validate rendering" and "Validate offline/self-hosting" sections: computed `font-family` is `IRANSans` on both pages, Persian glyphs render correctly, and the pages still render IranSans with the network disabled

**Checkpoint**: User Story 1 is fully functional — IranSans renders on both Farsi pages, self-hosted. This is the shippable MVP.

---

## Phase 4: User Story 2 - Repository only keeps the font files actually used (Priority: P2)

**Goal**: The repository contains only the font files the site actually loads, in a proper permanent folder — the rest of the downloaded kit is gone.

**Independent Test**: List the project tree and confirm `WebFonts/` no longer exists, `fonts/woff2/` and `fonts/woff/` each contain exactly the 4 needed files, and nothing in the site still points at `WebFonts/`.

**Note**: Run this phase's deletion task (T009) only after the User Story 1 checkpoint (T007) has been verified — `WebFonts/` is the source of the copies made in Phase 2, and keeping it until T007 passes gives a safety net to re-copy from if something's wrong.

### Implementation for User Story 2

- [X] T008 [US2] Grep the project for any remaining `WebFonts/` path references (`grep -r "WebFonts/" *.html *.css *.js`) and confirm there are none outside the `WebFonts/` folder itself
- [X] T009 [US2] Delete the `WebFonts/` folder entirely (demo `IRANSans.html`, `WebFonts.png` preview, original `css/`, unused `ttf/`/`eot/` formats, unused Light/UltraLight weights)
- [X] T010 [US2] Verify `fonts/woff2/` and `fonts/woff/` each contain exactly the 4 files listed in [data-model.md](./data-model.md), and that every file is referenced by an `@font-face` rule in `fonts/iransans.css` (no orphaned files, no unreferenced rules) per [contracts/font-face-contract.md](./contracts/font-face-contract.md)

**Checkpoint**: Both user stories complete — IranSans renders on Farsi pages, and the repository carries only the font files it actually uses.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final end-to-end validation and scope-boundary check.

- [X] T011 [P] Run the full [quickstart.md](./quickstart.md) validation end-to-end, including the "Validate fallback" section (temporarily block a `woff2` file and confirm text stays visible via the `woff`/system fallback)
- [X] T012 [P] Confirm English (`lang="en"`) pages are unmodified — `git diff` should show no changes to `index.html` or `isaqb-cpsa-f-day-02.html` through `isaqb-cpsa-f-day-10.html`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS both user stories
- **User Story 1 (Phase 3)**: Depends on Foundational only
- **User Story 2 (Phase 4)**: Depends on Foundational; its deletion task (T009) should follow US1's verification (T007) — see note in Phase 4
- **Polish (Phase 5)**: Depends on both user stories being complete

### Parallel Opportunities

- T002, T003, T004 (Foundational) touch different files/folders — run in parallel
- T005, T006 (US1) touch different pages — run in parallel
- T011, T012 (Polish) are independent checks — run in parallel

---

## Parallel Example: Foundational Phase

```bash
Task: "Copy needed woff2 files from WebFonts/fonts/woff2/ into fonts/woff2/"
Task: "Copy needed woff files from WebFonts/fonts/woff/ into fonts/woff/"
Task: "Create fonts/iransans.css with @font-face rules + license header"
```

## Parallel Example: User Story 1

```bash
Task: "Wire IranSans into index.fa.html"
Task: "Wire IranSans into isaqb-cpsa-f-day-01.fa.html"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 → Farsi pages render IranSans, self-hosted
4. **STOP and VALIDATE**: quickstart.md rendering + offline checks
5. `WebFonts/` can stay in place at this point (harmless, just unused) until Story 2 is done

### Incremental Delivery

1. Setup + Foundational → font asset set ready
2. User Story 1 → Farsi pages render correctly (MVP, ship-able as-is)
3. User Story 2 → repository cleaned up (`WebFonts/` removed)
4. Polish → full validation pass, scope-boundary confirmation

## Notes

- No test framework exists for this repo; all verification tasks are manual per `quickstart.md`.
- Commit after each phase checkpoint.
- Do not delete `WebFonts/` (T009) before T007 passes.
