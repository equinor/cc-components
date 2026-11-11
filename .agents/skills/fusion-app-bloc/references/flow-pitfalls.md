# Flow pitfalls

## Contents

- [A completing flow closes the store](#a-completing-flow-closes-the-store)
- [Flow output arrives a tick later](#flow-output-arrives-a-tick-later)
- [Decide on the latest state, not on echoed actions](#decide-on-the-latest-state-not-on-echoed-actions)
- [Choose the concurrency operator deliberately](#choose-the-concurrency-operator-deliberately)
- [Keep flows declarative and injected](#keep-flows-declarative-and-injected)

Each of these has broken a production Fusion Observable store before its lifecycle test caught it.
Behavior described here was verified against the `FlowSubject` source in
`@equinor/fusion-observable` 9.2.3.

## A completing flow closes the store

`subject.addFlow(flow)` subscribes the store's internal action stream to the flow's output. When
that output **completes**, the action stream completes with it: every later dispatch is silently
dropped, and `firstValueFrom(...)` waiting on the store throws `EmptyError`.

- Start every flow from `action$` and never let it complete. A bare `from(fetchSettings())` returned
  as a flow completes after one value.
- Trigger one-off work with an action and dispatch it once after the flows are attached:

  ```ts
  const loadFlow: SettingsFlow = (action$) =>
    action$.pipe(
      filterAction(settingsActions.load.type),
      switchMap(() => from(loadSettings())),
      map((settings) => settingsActions.loaded(settings)),
    );

  store.subject.addFlow(loadFlow);
  store.dispatch.load();
  ```

- An **uncaught error** inside a flow is logged (`console.trace('unhandled exception, epic
  closed!', ...)`) and replaced by an empty stream, which completes — the same failure. Catch errors
  on the inner observable (`from(request).pipe(map(success), catchError((e) => of(failure(e))))`),
  never on the outer `action$` pipe, so the flow keeps listening.

Symptoms: the first load works, then buttons stop doing anything; tests time out waiting for a
state that never arrives; a `console.trace` about a closed epic.

## Flow output arrives a tick later

Actions a flow emits are re-scheduled on RxJS's `asyncScheduler` before they reach the reducer.
State that tells the user an intent is not yet settled (`isSaving`, `status: 'saving'`) must be set
by the **reducer case for the intent itself**, not by an action the flow echoes back.

```ts
// Right: the intent marks the store as saving immediately.
.addCase(actions.save, (state) => { state.status = 'saving'; })
```

Otherwise the UI looks idle for a tick, and a user (or a browser test) can navigate or reload before
anything is written.

## Decide on the latest state, not on echoed actions

A flow that coalesces work — "write the latest data, then once more if it changed meanwhile" —
must read the store's current state, because a `saved` action from the previous run has not
arrived yet when the next decision is made. Deciding from echoed actions starts redundant or
overlapping writes.

Read the current state through `state$.pipe(take(1))` inside the inner observable, or through the
store's `subject.value` when the flow is defined inside the store factory. Coalesce with
`exhaustMap` plus `expand`:

```ts
// Inside the store factory, where `state` is the createState result.
let written = 0;
const write = defer(() => {
  const { data, changes } = state.subject.value;
  written = changes;
  return from(storage.save(data)).pipe(
    map(() => actions.saved(changes)),
    catchError((error: unknown) => of(actions.saveFailed(changes, error))),
  );
});

const saveFlow: Flow<Action, State> = (action$) =>
  action$.pipe(
    filterAction(actions.change.type),
    filter(() => state.subject.value.changes > written),
    exhaustMap(() => write.pipe(expand(() => (state.subject.value.changes > written ? write : EMPTY)))),
  );
```

Here the reducer increments `changes` on each `change` action; writes never overlap, and changes
made during a write are stored together by one more write when it ends.

## Choose the concurrency operator deliberately

| Need | Operator |
| --- | --- |
| Latest request wins; cancel stale ones (search, reload) | `switchMapAction(type, fn)` or `filterAction` + `switchMap` |
| Ignore new intents while one runs (submit, save) | `exhaustMap` |
| Run in order, one at a time (sequential patches that each need the previous version) | `concatMap` |
| Run in parallel, independent | `mergeMap` |

A flow without an explicit operator choice is a review finding.

## Keep flows declarative and injected

- One async concern per flow: select an action, call one injected dependency, map the result
  through a named selector when needed, dispatch success or failure.
- Inject HTTP calls, storage, the query client, clocks, and browser events as dependencies so tests
  can fake them.
- Surface failures through store state. Never replace failed external data with success-shaped
  defaults.
- Correlate async outcomes with the request when several can be in flight (for example an
  `operationId` in `meta`), so a late outcome does not settle the wrong request.
