<!--
Sync Impact Report
- Version change: (unversioned template) → 1.0.0
- Modified principles: N/A (initial ratification; all 5 slots filled for the first time)
- Added sections: Core Principles (I-V), Content Standards, Review Workflow, Governance
- Removed sections: none
- Templates requiring updates: none — plan/spec/tasks templates are generic and read
  this constitution at runtime; no changes needed for this ratification.
- Follow-up TODOs: RATIFICATION_DATE set to today (2026-09-03) since no prior
  ratified constitution or commit predating this content exists in the repo.
-->

# iSAQB CPSA-F Study Guide Constitution

## Core Principles

### I. Curriculum Fidelity

Every claim, term, and pattern presented MUST trace back to the official iSAQB
CPSA-F curriculum (syllabus topics, terminology, and scope) rather than to
personal opinion or a competing framework. Where the material extends beyond
the syllabus (e.g., a worked example), it MUST be clearly distinguishable from
core curriculum content. Rationale: this repo exists as exam-prep material —
content that drifts from the curriculum misleads learners and undermines the
guide's purpose.

### II. Consistent Daily Structure

Each day's page (`isaqb-cpsa-f-day-NN.html`) MUST follow the same structural
skeleton as its siblings: title format `iSAQB CPSA-F — Day N: <Topic>`,
consistent section ordering, and consistent visual/styling conventions
inherited from the existing days. `index.html` MUST stay in sync as the single
table of contents linking every day. Rationale: learners navigate this as a
10-day sequence; structural drift makes the guide feel unfinished and harder
to study from.

### III. Self-Contained Static Pages

Each day's page MUST remain a single, self-contained static HTML file with no
build step, bundler, or external framework dependency required to view it.
External resources (fonts, icons) MAY be loaded via CDN links but MUST NOT be
required for the content to be readable if offline. Rationale: the guide's
value is that any file can be opened directly in a browser or shared as-is —
introducing a build pipeline adds friction with no pedagogical benefit (YAGNI).

### IV. Accuracy Over Completeness

When a topic cannot be verified against the iSAQB CPSA-F syllabus or
authoritative sources, it MUST be flagged (e.g., as a TODO or note) rather than
presented as settled fact. Partial, clearly-marked coverage is preferred over
confident but unverified content. Rationale: exam-prep material that states
wrong information confidently is worse than material that admits a gap.

### V. Plain-Language Clarity

Content MUST prioritize clear, learner-facing explanations over dense academic
prose: define jargon on first use per page, prefer concrete examples over
abstract description, and keep sections skimmable (headings, lists, short
paragraphs). Rationale: the audience is candidates preparing for a
certification exam under time pressure, not architecture researchers.

## Content Standards

All day pages share the `isaqb-cpsa-f-day-NN.html` naming convention (zero-
padded two-digit day number) and are linked from `index.html`. New days or
topic reorganizations MUST update `index.html` in the same change. Styling
(CSS) MUST stay consistent across days — prefer copying and adapting an
existing day's structure over inventing a new layout.

## Review Workflow

Changes to existing day content (corrections, rewording, restructuring) MUST
be checked against Curriculum Fidelity (Principle I) and Accuracy Over
Completeness (Principle IV) before being considered done. New day content
MUST be checked against Consistent Daily Structure (Principle II) by comparing
against at least one existing day file. There is no automated test suite for
this content-only repository; review is manual and MUST happen before
publishing/committing.

## Governance

This constitution supersedes ad-hoc content decisions for this repository.
Amendments require: (1) a stated reason for the change, (2) an update to this
file including the Sync Impact Report header, and (3) a version bump per the
policy below.

**Versioning policy**: MAJOR — a principle is removed or redefined in a way
that invalidates prior content decisions; MINOR — a new principle or section
is added, or existing guidance is materially expanded; PATCH — wording,
typo, or clarification fixes with no semantic change.

Compliance is self-reviewed at content-change time using the Review Workflow
above; there is no separate CI gate for this static-content repository.

**Version**: 1.0.0 | **Ratified**: 2026-09-03 | **Last Amended**: 2026-09-03
