# Selector hook pitfalls

Prefer **one generic selector hook per app** (`useStoreSelector`, shown in `store-anatomy.md`) and
one thin wrapper per store (`useChecklistSelector`) over a bespoke hook per value. Behavior below
was verified against `useObservableState` and `useObservableSelector` in
`@equinor/fusion-observable` 9.2.3.

## How the two hooks behave

- `useObservableSelector(subject, selector, compare?)` returns
  `useMemo(() => subject.pipe(map(selector), distinctUntilChanged(compare)), [subject, selector, compare])`.
  A new `selector` or `compare` reference builds a **new derived observable**.
- `useObservableState(observable, { initial? })` returns `{ value, error, complete }`. Its first
  value is `initial ?? observable.value` — and a derived observable has no `.value`.

## Pitfalls and fixes

### Inline selectors re-subscribe on every render

`useChecklistSelector((s) => s.status)` creates a new function each render, so the derived
observable and its subscription are rebuilt each render.

Fix: pass a module-level selector (`selectStatus`). For a parameterised selector
(`selectItem(itemId)`), memoise it per argument — `useMemo(() => selectItem(itemId), [itemId])` in
the component, or a memoised factory in the selector file — or select the collection and pick in
render.

### New objects re-render on every emission

A selector returning a new object or array each call (`selectProgress`) changes identity on every
state emission, so `Object.is` never matches.

Fix: pass a structural `compare` (for example `fast-deep-equal` or a field-wise comparator) declared
at module level. Selecting an existing sub-object needs no comparator: the reducer uses immer, so
unchanged branches keep their reference. Return a shared constant (`noItems`) instead of a fresh
`[]` for empty fallbacks.

### Inline comparators freeze the page

An inline `compare` rebuilds the derived observable every render. Combined with a boxed or
new-object selection, each resubscription emits a new value, which renders again — forever. The
page freezes.

Fix: keep `compare` stable (module-level or memoised). `useStoreSelector` memoises the boxed
comparator on `compare`, so callers only need to pass a stable reference.

### A nullable `initial` flashes error states

`useObservableState(derived, { initial: selector(subject.value) })` treats `null` and `undefined`
as "no initial value" (`initial ?? observable.value`). A derived observable has no `.value`, so a
selector that legitimately returns `null` ("no error") renders `undefined` on the first render.
`error !== null` is then briefly true and error banners flash.

Fix: box the selection (`{ value: selector(state) }`) so the initial value is never nullish, then
unbox. `useStoreSelector` does this.

### Whole-store subscriptions

`useObservableState(store.subject)` re-renders the component on every state change and moves
selection logic into the view. Use a named selector per value instead.

## Deprecated APIs

- `useObservableSelectorState` is deprecated since 8.1: use
  `useObservableState(useObservableSelector(...))` (wrapped by `useStoreSelector`).
- `FlowSubject.addEpic` is deprecated: use `addFlow`.
- `useObservableEpic` is renamed to `useObservableFlow`.
- `ReactiveObservable` is deprecated: use `FlowSubject`.
