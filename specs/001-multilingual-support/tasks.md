---

description: "Task list template for feature implementation"
---

# Tasks: Multilingual Support (English & Farsi)

**Input**: Design documents from `/specs/001-multilingual-support/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/page-variant-contract.md](./contracts/page-variant-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Not requested in the feature spec. This is a static-content repo with no automated test suite (per the constitution's Review Workflow); validation is the manual `quickstart.md` checklist, referenced as tasks below instead of automated test tasks.

**Organization**: Tasks are grouped by user story (from `spec.md`) so each story can be implemented and verified independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- File paths are relative to the repository root

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the one new shared asset every page will load.

- [ ] T001 Create `lang-switch.js` at the repository root with two pure helpers per `data-model.md`: `getPref()` / `setPref(lang)` (read/write the `isaqb-cpsaf-lang` value in `localStorage`, wrapped in try/catch so a blocked/unavailable store never throws) and `siblingUrl(lang)` (derive the counterpart filename for the current page by adding/removing the `.fa` suffix per `contracts/page-variant-contract.md` naming convention)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The shared switcher behavior every user story's independent test relies on.

**⚠️ CRITICAL**: No user story task below can be verified until this phase is complete.

- [ ] T002 Extend `lang-switch.js` with `bindSwitcher()`, run on `DOMContentLoaded`: wire click handlers on `[data-lang-switch="en"]` / `[data-lang-switch="fa"]` elements to call `setPref(lang)` then navigate to `siblingUrl(lang)`; for the Farsi control specifically, if the current page's `data-fa-available` attribute is `"false"`, render it disabled with a "Farsi — coming soon" label instead of binding a click handler, per `contracts/page-variant-contract.md` (depends on T001)

**Checkpoint**: Shared script is ready — page-level wiring for each user story can now begin.

---

## Phase 3: User Story 1 - Switch the study guide to Farsi (Priority: P1) 🎯 MVP

**Goal**: Every page has a visible, working language switcher; `index.html` and Day 1 are fully readable in right-to-left Farsi.

**Independent Test**: Open `index.html`, switch to Farsi, confirm the page renders in Farsi and right-to-left; switch back to English and confirm it reverts.

### Implementation for User Story 1

- [ ] T003 [P] [US1] In `index.html`: set `<html lang="en" dir="ltr">`, add `data-fa-available="true"`, include `<script src="lang-switch.js" defer></script>`, and add the switcher control markup (`data-lang-switch="en"`, `data-lang-switch="fa"`) per `contracts/page-variant-contract.md`
- [ ] T004 [P] [US1] In `isaqb-cpsa-f-day-01.html`: apply the same wiring as T003 with `data-fa-available="true"`
- [ ] T005 [P] [US1] In each of `isaqb-cpsa-f-day-02.html`, `isaqb-cpsa-f-day-03.html`, `isaqb-cpsa-f-day-04.html`, `isaqb-cpsa-f-day-05.html`, `isaqb-cpsa-f-day-06.html`, `isaqb-cpsa-f-day-07.html`, `isaqb-cpsa-f-day-08.html`, `isaqb-cpsa-f-day-09.html`, `isaqb-cpsa-f-day-10.html`: apply the same wiring as T003 but with `data-fa-available="false"`, so the Farsi option shows the disabled "not yet translated" state per FR-007
- [ ] T006 [US1] Author `index.fa.html`: complete Farsi translation of `index.html`'s learner-facing text (title, headings, body copy, nav labels, progress-tracker UI labels); `<html lang="fa" dir="rtl">`, `data-fa-available="true"`; switcher's English control points back to `index.html`; keep the `data-day` attributes and the `isaqb-cpsaf-progress` tracker script byte-identical to `index.html` (translate labels only, not logic); day-card links point to `isaqb-cpsa-f-day-01.fa.html` for Day 1 and to the plain English files for Days 2–10 (depends on T001, T002, T003, T004)
- [ ] T007 [US1] Author `isaqb-cpsa-f-day-01.fa.html`: complete Farsi translation of `isaqb-cpsa-f-day-01.html`'s learner-facing text; `<html lang="fa" dir="rtl">`, `data-fa-available="true"`; switcher's English control points back to `isaqb-cpsa-f-day-01.html`; keep `data-day` attributes and any tracker-related script identical; nav sidebar links to `index.fa.html` and to the plain English files for Days 2–10 (depends on T001, T002, T004, T006)
- [ ] T008 [US1] Manual validation: run `quickstart.md` Scenarios 1, 3, and 6 against `index.html`/`index.fa.html` and `isaqb-cpsa-f-day-01.html`/`isaqb-cpsa-f-day-01.fa.html`

**Checkpoint**: User Story 1 is fully functional and testable on its own — a learner can switch index.html and Day 1 between English and Farsi.

---

## Phase 4: User Story 2 - Language choice follows the learner across pages (Priority: P2)

**Goal**: A learner's language choice is remembered and applied automatically on later page views and future visits.

**Independent Test**: Select Farsi on `index.html`, navigate to Day 1, confirm it opens already in Farsi; reload later and confirm the choice is still remembered.

### Implementation for User Story 2

- [ ] T009 [US2] Extend `lang-switch.js` with `redirectToPreferred()`, called before `bindSwitcher()` inside the same `DOMContentLoaded` handler: compare `getPref()` to the current page's `<html lang>`; if they differ and the target variant exists (the `fa` target requires `data-fa-available="true"`; the `en` target always exists), call `location.replace(siblingUrl(pref))` exactly once (depends on T001, T002)
- [ ] T010 [US2] Manual validation: run `quickstart.md` Scenario 2 (preference follows navigation and survives a reload) and Scenario 5 (switcher still works for the current view when `localStorage` is blocked, without errors)

**Checkpoint**: User Stories 1 and 2 both work — switching persists across pages and visits.

---

## Phase 5: User Story 3 - Progress tracking keeps working regardless of language (Priority: P3)

**Goal**: Marking a day "done" is unaffected by which language is displayed.

**Independent Test**: Mark Day 1 done while viewing English, switch to Farsi, confirm it still shows as done (and vice versa).

### Implementation for User Story 3

- [ ] T011 [US3] Verify `index.fa.html` and `isaqb-cpsa-f-day-01.fa.html` (from T006, T007) use `data-day` values and an `isaqb-cpsaf-progress` tracker script/key identical to their English sources — fix any drift so completion state is shared across both languages (depends on T006, T007)
- [ ] T012 [US3] Manual validation: run `quickstart.md` Scenario 4 (mark a day done, switch language, confirm state is preserved in both directions)

**Checkpoint**: All three user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final, whole-feature verification once all stories are complete.

- [ ] T013 Run the complete `quickstart.md` checklist end-to-end across all 11 page families
- [ ] T014 Have a native Farsi reader review `index.fa.html` and `isaqb-cpsa-f-day-01.fa.html` for reading order, grammar, and terminology (SC-004); correct any issues found
- [ ] T015 [P] Re-check every page family against the `contracts/page-variant-contract.md` compliance checklist (attributes, switcher state, script inclusion, shared identifiers)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on T001 — blocks every user story below.
- **User Story 1 (Phase 3)**: Depends on Foundational. No dependency on US2/US3.
- **User Story 2 (Phase 4)**: Depends on Foundational; its independent test also relies on US1's page wiring (T003–T007) already existing, matching the priority order in `spec.md`.
- **User Story 3 (Phase 5)**: Depends on US1's translated files (T006, T007) existing, to verify identifier parity.
- **Polish (Phase 6)**: Depends on all three user stories being complete.

### Within Each User Story

- US1: page-wiring tasks (T003–T005) before authoring the Farsi files (T006–T007); validation (T008) last.
- US2: script extension (T009) before validation (T010).
- US3: verification (T011) before validation (T012).

### Parallel Opportunities

- T003, T004, T005 touch disjoint files and can run in parallel.
- T015 can run in parallel with T013/T014 (review vs. hands-on validation).

---

## Parallel Example: User Story 1

```bash
# After Foundational (T001, T002) is done, wire the switcher onto every English page in parallel:
Task: "Wire switcher onto index.html (T003)"
Task: "Wire switcher onto isaqb-cpsa-f-day-01.html (T004)"
Task: "Wire switcher onto isaqb-cpsa-f-day-02.html..isaqb-cpsa-f-day-10.html (T005)"
# Then author the two Farsi files sequentially (T006, then T007), since each cross-links the other.
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (T001) and Phase 2 (T002).
2. Complete Phase 3 (T003–T008).
3. **STOP and VALIDATE**: confirm `index.html` and Day 1 switch correctly between English and Farsi.
4. This alone delivers the feature's core value described in the spec.

### Incremental Delivery

1. Setup + Foundational → shared script ready.
2. Add User Story 1 → switcher live on all 11 pages, 2 pages fully translated → demo (MVP).
3. Add User Story 2 → language choice persists across navigation and visits → demo.
4. Add User Story 3 → confirmed progress tracking is unaffected → demo.
5. Polish → full regression pass + native-reader review.

## Notes

- Only 3 files are newly authored with translated content in this feature: `index.fa.html` and `isaqb-cpsa-f-day-01.fa.html` (Days 2–10 remain English-only, switcher-ready, per the scope decision in `spec.md`).
- No new dependency, bundler, or build step is introduced anywhere in this task list, per Constitution Principle III.
- Commit after each task or logical group; stop at any checkpoint to validate a story independently.
