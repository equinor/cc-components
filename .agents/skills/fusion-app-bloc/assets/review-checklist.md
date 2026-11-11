# State management review checklist

Copy into a review or pull request and check each item. Report every unchecked item with its
location and the lowest rung that fixes it.

## Proportionality
- [ ] Each new abstraction sits on the lowest ladder rung that fixes a concrete problem.
- [ ] No store, provider, or factory exists for a toggle, a dialog, or a single use.
- [ ] Plain server reads and one-shot submits use React Query, not a store.
- [ ] Rung-boundary choices were raised with the user rather than decided silently.

## Presentation
- [ ] No component subscribes to an entire store subject.
- [ ] No prop is forwarded through two or more levels.
- [ ] No callback prop merely wraps a store action.
- [ ] Every `useState` holds ephemeral view state only.
- [ ] Every `useEffect` is view-only (focus, scroll, measurement) or has moved to a flow or query.
- [ ] Domain decisions (status, permissions, available commands) are named selectors.
- [ ] Selectors and comparators passed to hooks are stable references.

## Store
- [ ] State exposes an explicit `status` union rather than flags inferred from requests.
- [ ] Actions are named for intent, and intent cases mark unsettled state immediately.
- [ ] Every flow starts from `action$`, catches errors on its inner observable, and states its
      concurrency operator.
- [ ] Dependencies are injected; reducers do no I/O.
- [ ] The store does not subscribe to sibling stores or copy URL/Fusion module state.
- [ ] No deprecated APIs (`useObservableSelectorState`, `addEpic`, `useObservableEpic`).

## Tests
- [ ] A new or changed store has one lifecycle contract test through its public surface.
- [ ] Existing component tests still pass, with fewer props where propagation was removed.
