# Store anatomy

## Contents

- [Vocabulary: flutter_bloc → Fusion Observable](#vocabulary-flutter_bloc--fusion-observable)
- [Layout](#layout)
- [Minimal example: an editable checklist](#minimal-example-an-editable-checklist)
- [Component shape](#component-shape)

A store is rung 5 of the proportionality ladder. Build one only when the ladder says so, and start
with the smallest shape: actions plus reducer cases (a "Cubit"), adding flows when async work
arrives.

APIs used here were verified against `@equinor/fusion-observable` 9.2.3. Import paths:

| Import | From |
| --- | --- |
| `createState`, `createReducer`, `ActionTypes`, `Flow` | `@equinor/fusion-observable` |
| `createAction`, `createAsyncAction` | `@equinor/fusion-observable/actions` (also re-exported from the root) |
| `filterAction`, `switchMapAction` | `@equinor/fusion-observable/operators` |
| `useObservableState`, `useObservableSelector`, `useObservableEffect` | `@equinor/fusion-observable/react` |

## Vocabulary: flutter_bloc → Fusion Observable

| flutter_bloc | Here | File |
| --- | --- | --- |
| `Bloc<Event, State>` | `createState(actions, reducer)` store with flows | `store.ts` |
| `Event` / `bloc.add(event)` | action creator / `store.actions.x(...)` | `actions.ts`, `store.ts` |
| `on<Event>` (sync) | reducer case (`builder.addCase`) | `reducer.ts` |
| `on<Event>` with async work and a `transformer:` | flow: `switchMapAction` latest-wins, `exhaustMap` ignore-while-busy, `concatMap` ordered | `flows/*.flow.ts` |
| sealed `State` classes | state with an explicit `status` union | `reducer.ts` |
| `Repository` / data provider | HTTP calls, React Query cache, Fusion app state, the URL — injected as dependencies | `flows/types.ts` |
| `BlocProvider(create:)` | `<XProvider>` that builds the store once in `useMemo` | `provider.tsx` |
| `context.read<XBloc>()` | `useX().actions` | `hooks/useX.ts` |
| `context.select(...)` / `BlocBuilder(buildWhen:)` | `useXSelector(selectY)` | `hooks/useXSelector.ts` |
| `BlocListener` | a flow; or `useObservableEffect(subject, type, effect)` for view-only effects (focus, toast) | flow / component |
| `Cubit` | a store with reducer cases and no flows | same layout, fewer files |

## Layout

```
<state-root>/<name>/
  types.ts                  domain types owned by the store (not raw transport types)
  actions.ts                createAction / createAsyncAction — the event vocabulary
  reducer.ts                state type with explicit status + reducer cases
  selectors/*.selector.ts   pure named projections and command availability
  flows/types.ts            <Name>Dependencies and <Name>Flow
  flows/*.flow.ts           one async concern per flow, dependencies injected
  store.ts                  create<Name>Store(...) → { subject, actions, dispose }
  context.ts                React context (null default)
  provider.tsx              builds the store once from Fusion hooks
  hooks/use<Name>.ts            context accessor; throws outside the provider
  hooks/use<Name>Selector.ts    stream-read hook
  index.ts                  public surface: provider, hooks, selectors, types
  <name>.test.ts            one lifecycle contract test
```

Use the app's existing folder convention for `<state-root>` (for example `src/domain` or
`src/state`). Keep reducers, flows, and raw action creators out of `index.ts`.

## Minimal example: an editable checklist

### `types.ts`

```ts
export interface ChecklistItem { id: string; label: string; done: boolean }
export interface Checklist { id: string; title: string; items: ChecklistItem[] }
```

### `actions.ts`

```ts
import { createAction, createAsyncAction } from '@equinor/fusion-observable/actions';
import type { Checklist } from './types';

export const checklistActions = {
  load: createAsyncAction(
    'checklist/load',
    (id: string) => ({ payload: { id } }),
    (checklist: Checklist) => ({ payload: { checklist } }),
    (error: unknown) => ({ payload: { error } }),
  ),
  toggleItem: createAction('checklist/toggle-item', (itemId: string) => ({ payload: { itemId } })),
  save: createAsyncAction(
    'checklist/save',
    () => ({ payload: undefined }),
    (checklist: Checklist) => ({ payload: { checklist } }),
    (error: unknown) => ({ payload: { error } }),
  ),
};
```

`createAsyncAction(type, request, success, failure)` returns the request creator (type
`checklist/load::request`) with `.success` and `.failure` creators attached. Every creator has
`.type` and `.match(action)`.

### `reducer.ts`

```ts
import { type ActionTypes, createReducer } from '@equinor/fusion-observable';
import { checklistActions } from './actions';
import type { Checklist } from './types';

export type ChecklistAction = ActionTypes<typeof checklistActions>;

export interface ChecklistState {
  status: 'loading' | 'ready' | 'saving' | 'error';
  checklist: Checklist | null;
  dirty: boolean;
  error: unknown | null;
}

export const createChecklistReducer = () =>
  createReducer<ChecklistState, ChecklistAction>(
    { status: 'loading', checklist: null, dirty: false, error: null },
    (builder) =>
      builder
        .addCase(checklistActions.load, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(checklistActions.load.success, (state, { payload }) => {
          state.status = 'ready';
          state.checklist = payload.checklist;
          state.dirty = false;
        })
        .addCase(checklistActions.load.failure, (state, { payload }) => {
          state.status = 'error';
          state.error = payload.error;
        })
        .addCase(checklistActions.toggleItem, (state, { payload }) => {
          const item = state.checklist?.items.find(({ id }) => id === payload.itemId);
          if (state.status !== 'ready' || !item) return;
          item.done = !item.done;
          state.dirty = true;
        })
        // The intent itself marks the store as saving: flow outcomes arrive a tick later.
        .addCase(checklistActions.save, (state) => {
          state.status = 'saving';
          state.error = null;
        })
        .addCase(checklistActions.save.success, (state, { payload }) => {
          state.status = 'ready';
          state.checklist = payload.checklist;
          state.dirty = false;
        })
        .addCase(checklistActions.save.failure, (state, { payload }) => {
          state.status = 'ready';
          state.error = payload.error;
        }),
  );
```

Case reducers mutate an immer draft, so unchanged branches keep their reference. Keep reducers
deterministic: no parsing, network, or storage.

`createState` also accepts `{ initial, builder: (builder, actions) => ... }` instead of a
`createReducer` result; pick one form per app.

### `selectors/checklist.selector.ts`

```ts
import type { ChecklistItem } from '../types';
import type { ChecklistState } from '../reducer';

const noItems: readonly ChecklistItem[] = [];

export const selectStatus = (state: ChecklistState) => state.status;
export const selectItems = (state: ChecklistState) => state.checklist?.items ?? noItems;
export const selectError = (state: ChecklistState) => state.error;
export const canEdit = (state: ChecklistState) => state.status === 'ready';
export const canSave = (state: ChecklistState) => state.status === 'ready' && state.dirty;
/** Builds a new object on every call; pass a structural compare when selecting it. */
export const selectProgress = (state: ChecklistState) => {
  const items = selectItems(state);
  return { done: items.filter(({ done }) => done).length, total: items.length };
};
/** Parameterised: memoise per id in the component (`useMemo`) so the reference is stable. */
export const selectItem = (itemId: string) => (state: ChecklistState) =>
  state.checklist?.items.find(({ id }) => id === itemId);
```

### `flows/types.ts`

```ts
import type { Flow } from '@equinor/fusion-observable';
import type { ChecklistAction, ChecklistState } from '../reducer';
import type { Checklist } from '../types';

export type ChecklistFlow = Flow<ChecklistAction, ChecklistState>;

/** Data boundaries the flows need; the provider builds them, tests fake them. */
export interface ChecklistDependencies {
  fetchChecklist: (id: string) => Promise<Checklist>;
  saveChecklist: (checklist: Checklist) => Promise<Checklist>;
}
```

### `flows/load.flow.ts` — latest wins

```ts
import { switchMapAction } from '@equinor/fusion-observable/operators';
import { catchError, from, map, of } from 'rxjs';
import { checklistActions } from '../actions';
import type { ChecklistDependencies, ChecklistFlow } from './types';

export const createLoadFlow =
  ({ fetchChecklist }: ChecklistDependencies): ChecklistFlow =>
  (action$) =>
    action$.pipe(
      switchMapAction(checklistActions.load.type, ({ payload }) =>
        from(fetchChecklist(payload.id)).pipe(
          map((checklist) => checklistActions.load.success(checklist)),
          catchError((error: unknown) => of(checklistActions.load.failure(error))),
        ),
      ),
    );
```

### `flows/save.flow.ts` — ignore while busy, read the latest state

```ts
import { filterAction } from '@equinor/fusion-observable/operators';
import { catchError, exhaustMap, from, map, of, switchMap, take } from 'rxjs';
import { checklistActions } from '../actions';
import type { ChecklistDependencies, ChecklistFlow } from './types';

export const createSaveFlow =
  ({ saveChecklist }: ChecklistDependencies): ChecklistFlow =>
  (action$, state$) =>
    action$.pipe(
      filterAction(checklistActions.save.type),
      exhaustMap(() =>
        state$.pipe(
          take(1),
          switchMap(({ checklist }) =>
            checklist
              ? from(saveChecklist(checklist)).pipe(
                  map((saved) => checklistActions.save.success(saved)),
                  catchError((error: unknown) => of(checklistActions.save.failure(error))),
                )
              : of(checklistActions.save.failure(new Error('Nothing to save.'))),
          ),
        ),
      ),
    );
```

The operator is the concurrency policy: `switchMap` cancels the previous run, `exhaustMap` ignores
new intents while one runs, `concatMap` queues them, `mergeMap` runs them in parallel.

### `store.ts`

```ts
import { createState } from '@equinor/fusion-observable';
import { Subscription } from 'rxjs';
import { checklistActions } from './actions';
import { createLoadFlow } from './flows/load.flow';
import { createSaveFlow } from './flows/save.flow';
import type { ChecklistDependencies } from './flows/types';
import { createChecklistReducer } from './reducer';

export const createChecklistStore = (checklistId: string, deps: ChecklistDependencies) => {
  const store = createState(checklistActions, createChecklistReducer());
  const flows = new Subscription();
  flows.add(store.subject.addFlow(createLoadFlow(deps)));
  flows.add(store.subject.addFlow(createSaveFlow(deps)));

  // One-off work starts from an action dispatched after the flows are attached.
  store.dispatch.load(checklistId);

  // Bound commands are the only write surface components see.
  const actions = {
    reload: () => store.dispatch.load(checklistId),
    toggleItem: store.dispatch.toggleItem,
    save: store.dispatch.save,
  };
  const dispose = () => {
    flows.unsubscribe();
    store.subject.complete();
  };

  return { subject: store.subject, actions, dispose };
};

export type ChecklistStore = ReturnType<typeof createChecklistStore>;
```

`createState` returns `{ subject, actions, dispatch }`: `subject` is a `FlowSubject` (an
`Observable<State>` with a synchronous `.value`, `.action$`, `.addFlow`, `.next(action)`), and
`dispatch` binds every action creator to `subject.next`.

### `context.ts`, `provider.tsx`, and hooks

```ts
// context.ts
import { createContext } from 'react';
import type { ChecklistStore } from './store';

export const ChecklistContext = createContext<ChecklistStore | null>(null);
```

```tsx
// provider.tsx
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { type ReactNode, useMemo } from 'react';
import { ChecklistContext } from './context';
import { createChecklistStore } from './store';
import type { Checklist } from './types';

export const ChecklistProvider = ({ checklistId, children }: { checklistId: string; children: ReactNode }) => {
  const client = useHttpClient('checklists'); // a client registered in the app configuration
  const store = useMemo(
    () =>
      createChecklistStore(checklistId, {
        fetchChecklist: (id) => client.json<Checklist>(`/checklists/${id}`),
        saveChecklist: (checklist) =>
          client.json<Checklist>(`/checklists/${checklist.id}`, { method: 'PUT', body: checklist }),
      }),
    [checklistId, client],
  );
  return <ChecklistContext.Provider value={store}>{children}</ChecklistContext.Provider>;
};
```

Mount the provider at the lowest route or layout that owns the lifetime. Do not call `dispose` from
a `useEffect` cleanup in the provider: React StrictMode runs that cleanup once in development while
keeping the memoised store, which leaves a completed store in use. To stop long-lived flows (polling,
timers) on unmount, dispatch an action such as `observe(true)` / `observe(false)` from an effect and
let the flow react to it. Use `dispose` in tests and non-React owners.

```ts
// hooks/useChecklist.ts
import { useContext } from 'react';
import { ChecklistContext } from '../context';

export const useChecklist = () => {
  const store = useContext(ChecklistContext);
  if (!store) throw new Error('useChecklist must be used within a ChecklistProvider');
  return store;
};
```

```ts
// hooks/useStoreSelector.ts — shared by every store; see selector-hook-pitfalls.md for why
import { useObservableSelector, useObservableState } from '@equinor/fusion-observable/react';
import { useMemo } from 'react';
import type { Observable } from 'rxjs';

export type StoreSubject<S> = Observable<S> & { readonly value: S };

export const useStoreSelector = <S, T>(
  subject: StoreSubject<S>,
  selector: (state: S) => T,
  compare: (previous: T, current: T) => boolean = Object.is,
): T => {
  // Boxed so a null selection is not mistaken for a missing initial value.
  const select = useMemo(() => (state: S) => ({ value: selector(state) }), [selector]);
  const isSame = useMemo(
    () => (previous: { value: T }, current: { value: T }) => compare(previous.value, current.value),
    [compare],
  );
  const { value: selection } = useObservableState(useObservableSelector(subject, select, isSame), {
    initial: select(subject.value),
  });
  return selection.value;
};
```

```ts
// hooks/useChecklistSelector.ts
import type { ChecklistState } from '../reducer';
import { useChecklist } from './useChecklist';
import { useStoreSelector } from './useStoreSelector';

export const useChecklistSelector = <T>(
  selector: (state: ChecklistState) => T,
  compare?: (previous: T, current: T) => boolean,
): T => useStoreSelector(useChecklist().subject, selector, compare);
```

## Component shape

```tsx
// Right: the leaf reads and writes for itself; the parent passes identity only.
export const ChecklistItemRow = ({ itemId }: { itemId: string }) => {
  const selectThisItem = useMemo(() => selectItem(itemId), [itemId]);
  const item = useChecklistSelector(selectThisItem);
  const editable = useChecklistSelector(canEdit);
  const { toggleItem } = useChecklist().actions;
  if (!item) return null;
  return (
    <Checkbox
      label={item.label}
      checked={item.done}
      disabled={!editable}
      onChange={() => toggleItem(itemId)}
    />
  );
};
```

```tsx
// Wrong: the parent subscribes to everything, derives in render, and propagates.
const ChecklistPage = () => {
  const store = useChecklist();
  const { value: state } = useObservableState(store.subject);
  const readOnly = state.status !== 'ready';
  return (
    <Sections
      items={state.checklist?.items ?? []}
      readOnly={readOnly}
      onToggle={(id) => store.actions.toggleItem(id)}
    />
  );
};
```
