# Changelog

## 0.1.2 - 2026-11-01

### patch

- [#391](https://github.com/equinor/fusion-skills/pull/391) [`ece2d45`](https://github.com/equinor/fusion-skills/commit/ece2d4547c2cfd491234816c41c780b5153850ec) - Tighten state ownership guidance while preserving the lightest-owner ladder, flow errors, disposal and audit authorization. Load worked requests and changed-code review only when relevant.


  resolves equinor/fusion-core-tasks#2689

## 0.1.1 - 2026-11-01

### patch

- [#363](https://github.com/equinor/fusion-skills/pull/363) [`f34c0d9`](https://github.com/equinor/fusion-skills/commit/f34c0d9dc7de15e59ec643407914e98ad8288245) - Shorten BLoC state-ownership description while retaining shared editing workflows, prop drilling, lightest-owner selection and store/selector diagnostics. Keep React Query, leaf-state and test-setup exclusions.


  resolves equinor/fusion-core-tasks#2672

## 0.1.0 - 2026-10-18

### minor

- [#275](https://github.com/equinor/fusion-skills/pull/275) [`ac663a1`](https://github.com/equinor/fusion-skills/commit/ac663a12751696343660c2d3c2625e852fa1c4db) - Add experimental `fusion-app-bloc` skill for state management in Fusion Framework React apps


  Packages a BLoC-inspired pattern on `@equinor/fusion-observable`: stateless components read named selectors and dispatch intent actions, flows own async work, and state is not forwarded through props. Proportionality comes first: a five-rung ladder (props and `useState`, React Query, an existing store hook, a small provider, a full store) picks the lightest owner, and the agent asks the user when a choice sits between two rungs.

  - `SKILL.md`: activation cues, the ladder, core rules, and a classify → choose rung → design/refactor/diagnose/audit → test → review workflow
  - `references/store-anatomy.md`: flutter_bloc vocabulary map, folder layout, and a complete minimal store example verified against `@equinor/fusion-observable` 9.2.3
  - `references/flow-pitfalls.md` and `references/selector-hook-pitfalls.md`: completing or uncaught flows that close the store, tick-late flow output, coalesced writes, unstable selectors and comparators, nullable `initial` flashes, and deprecated APIs
  - `references/extraction-recipe.md`, `references/smell-catalog.md`, `references/testing-the-store.md`, and `assets/review-checklist.md` for refactors, read-only audits, lifecycle contract tests, and reviews

  resolves equinor/fusion-core-tasks#2406
