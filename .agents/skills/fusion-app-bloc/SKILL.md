---
name: fusion-app-bloc
description: 'Guides Fusion React state ownership with BLoC patterns on @equinor/fusion-observable; chooses lightest owner. USE FOR: shared editing workflows, prop drilling, createState actions/selectors/flows, stalled stores, unstable selector hooks. DO NOT USE FOR: React Query fetching/submits (use fusion-developer-app), leaf view state, non-Fusion/non-React apps, test setup (use fusion-framework-testing).'
license: MIT
compatibility: Requires a Fusion Framework React app using @equinor/fusion-observable 9.x and RxJS 7. Examples were verified against @equinor/fusion-observable 9.2.3; React Query guidance assumes @tanstack/react-query v5.
metadata:
  version: "0.1.2"
  status: experimental
  owner: "@equinor/fusion-core"
  skills:
    - fusion-developer-app
    - fusion-framework-testing
  tags:
    - fusion-framework
    - fusion-observable
    - state-management
    - bloc
    - react
    - rxjs
  mcp:
    suggested:
      - fusion
---

# Fusion App BLoC

## When to use

Fusion React state design/refactor/diagnosis/audit: ownership, prop drilling, shared edits,
async effects, hook-heavy components, stalled stores or unstable selectors. Observable APIs
also trigger; examples below. Proportional pattern, not mandate: read streams/write actions.

## When not to use

- Plain server reads/one-shot submits: React Query `useQuery` / `useMutation`;
  `fusion-developer-app` owns query guidance.
- Leaf menu/dialog/hover/input state: `useState`.
- Fusion context/bookmarks/settings/flags: module hooks, never copied state.
- Non-Fusion/non-React apps; runner/fixtures: `fusion-framework-testing`.

## Required inputs

Scope, task (**design**, **refactor**, **diagnose**, **audit**), state/readers/writers.
When relevant: existing owners/conventions, reload survival (app state/settings/URL vs session),
concurrency/polling/retries and tests. Owner unclear after code review: ask before building.

## Proportionality ladder

Pick **lowest rung** that removes problem:

| Rung | Use when | Example |
| --- | --- | --- |
| 1. Props and `useState` | Leaf ephemeral state or direct-child value | `isMenuOpen`; `<Badge label={status} />` |
| 2. React Query | Fetched/displayed server data or one-shot submit | list load; form submit |
| 3. Existing store hook | Existing store, nested reader | `useChecklistSelector(...)` |
| 4. Small provider | Shared state/callback or two or more forwarding levels | section view toggle |
| 5. Store with actions, selectors, and flows | Several writers, transitions, persistence, async coordination/concurrency | editable working copy, save/sync/conflicts |

Direct-child props are fine; two or more forwarding hops are propagation. Extend existing
domain first. No store/provider/generic factory "for later": require second real use or smell.
Two defensible rungs: stop and ask with options/trade-off; never silently choose heavier one.
Explain rung and why lower rungs do not fit.

## Core rules

1. Components render selections/dispatch actions. `useState` is ephemeral only; shared/
   flow/persistence/reload agreement belongs in store.
2. Named module-level selectors only; never whole `store.subject`.
3. Intent actions (`toggleItem`, `save`), not computed next state. Reducer intent marks unsettled
   state immediately; flow output is a tick later. Deterministic reducers, no I/O.
4. Children call owner hooks. Props: identity (`itemId`), static config, presentation;
   action-wrapping callbacks smell.
5. No `useEffect(() => setX(derive(y)), [y])` sync: selector. Fetch/persist/poll/debounce/retry:
   flow or query. DOM-only effects stay in components.
6. Status/permissions/commands: pure named selectors shared by views/flows/tests,
   not `useMemo` or JSX domain decisions.
7. No sibling-store subscriptions; coordinate in presentation or shared lower dependency.
8. URL/Fusion modules/settings stay sources of truth, read through flows without copying.

## Safety & constraints

This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.

- Follow target conventions/instructions/ADRs. Never request/expose secrets; destructive actions
  and issue publication need explicit confirmation. Audit changes no code. Findings-to-issues
  is request-only, draft-first through `fusion-issue-authoring`; publication needs separate consent.
- No invented APIs: verify unshown APIs against installed package or `mcp_fusion_search_framework`.
  No deprecated `useObservableSelectorState` or `addEpic`.
- Flows start at `action$`, never complete; catch errors inside inner observable, not outer stream.
  Inject dependencies, choose concurrency, correlate concurrent outcomes; surface failure in state,
  never success-shaped defaults.
- Selectors/comparators stay module-level or memoised; box nullable initial selections and reuse
  empty constants to prevent flashes/resubscription loops.
- Attach flows before initial dispatch. Disposal unsubscribes flows and completes subject.
  Lowest lifetime provider. Never call `dispose` in provider `useEffect` cleanup:
  StrictMode retains memoised store after cleanup. Stop polling/timers on unmount with actions
  such as `observe(true)` / `observe(false)`; `dispose` in tests/non-React owners.
- Required companion missing: report and stop dependent branch, never silently skip.

## Repository-policy handoff

Target instructions (`CONTRIBUTING.md`, `.github/instructions/`, ADRs) own commit format,
branches, validation, changesets and PR rules; this skill defines none.

## Instructions

1. Classify **ephemeral view**, **server cache**, **workflow**, **derived**; count readers/writers/
   hops. Choose rung as above.
2. Read matching guidance before acting:

| When | Read | Purpose |
| --- | --- | --- |
| Design rung 5 or build store/provider/hooks | `references/store-anatomy.md` | Layout, vocabulary, intact example; reducer-only first, async flows later |
| Refactor | `references/extraction-recipe.md` | One seam per PR, behavior/component tests preserved with fewer props |
| Add/change flow or diagnose stalled/idle/overlapping work | `references/flow-pitfalls.md` | Errors, scheduling, latest-state and concurrency |
| Build/diagnose selector hooks | `references/selector-hook-pitfalls.md` | Stable identity, boxed initial, deprecated APIs |
| Audit or requested findings-to-issues | `references/smell-catalog.md` | Read-only scan/ranking, gated issue drafts |
| Compare ownership/import triggers | `references/request-examples.md` | ChecklistPage and lower-rung counterexamples |

3. New/changed store: read `references/testing-the-store.md` for one public-surface/injected
   lifecycle test; add/extend it. `fusion-framework-testing` owns runner/render;
   `fusion-framework-mocking` owns Fusion module state.
4. Changed code: read/apply `assets/review-checklist.md`; address/report every unchecked item
   with location/lowest rung. Audit reports review findings, no edits.

## Expected output

Rung/reason and boundary questions per state; design/refactor files, removed props and lifecycle
test per new/changed store; diagnosis pitfall/remedy plus test/reproduction evidence; audit
ranked smell/location/lowest rung/blast radius with no code changes; review checklist outcome.
