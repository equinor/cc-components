# Testing the store contract

A store is tested through its **public surface** (`createXStore(...)`, `store.actions`,
`store.subject`) and its **injected dependencies** — not through reducers, flows, or selectors in
isolation. The store needs no React, so this is a standard Vitest test; use
`fusion-framework-testing` only for component or hook tests that render.

## Rules

- Keep **one essential lifecycle contract test** per store, in one test file named after it.
- Cover the authoritative paths: initial load, the main user intents, success and failure, and any
  concurrency the flows promise (latest-wins, ignore-while-busy, ordering, coalescing).
- Fake dependencies with controllable promises so in-flight states are observable.
- Wait for state with `firstValueFrom(store.subject.pipe(filter(...)))` or `vi.waitFor`; flow
  output arrives on a later tick, so never assert it synchronously after a dispatch.
- Assert intent-level state synchronously: a reducer case for the intent applies immediately (for
  example `status` becomes `'saving'` right after `save()`).
- Add a separate regression test only for a concern the lifecycle test cannot reach. Do not add
  reducer micro-tests, selector tests, or one test per action.
- Call `dispose()` at the end so flows do not leak between tests.

## Example

```ts
import { firstValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';
import { expect, it, vi } from 'vitest';
import { canSave, selectItems } from './selectors/checklist.selector';
import { createChecklistStore } from './store';
import type { Checklist } from './types';

const checklist: Checklist = {
  id: 'c1',
  title: 'Pre-start',
  items: [{ id: 'i1', label: 'Valve closed', done: false }],
};

/** A dependency whose calls stay pending until the test settles them. */
const deferred = <T>() => {
  let resolve!: (value: T) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
};

it('loads, edits, saves once while busy, and keeps edits after a failed save', async () => {
  const save = deferred<Checklist>();
  const deps = {
    fetchChecklist: vi.fn().mockResolvedValue(checklist),
    saveChecklist: vi.fn(() => save.promise),
  };
  const store = createChecklistStore('c1', deps);
  const when = (predicate: (state: typeof store.subject.value) => boolean) =>
    firstValueFrom(store.subject.pipe(filter(predicate)));

  await when(({ status }) => status === 'ready');
  expect(deps.fetchChecklist).toHaveBeenCalledWith('c1');

  store.actions.toggleItem('i1');
  expect(selectItems(store.subject.value)[0]?.done).toBe(true);
  expect(canSave(store.subject.value)).toBe(true);

  // The intent marks saving at once; a second save while busy is ignored.
  store.actions.save();
  store.actions.save();
  expect(store.subject.value.status).toBe('saving');
  await vi.waitFor(() => expect(deps.saveChecklist).toHaveBeenCalledTimes(1));

  // A failed save reports why and keeps the unsaved edit.
  save.reject(new Error('offline'));
  await when(({ status }) => status === 'ready');
  expect(store.subject.value.error).toEqual(new Error('offline'));
  expect(canSave(store.subject.value)).toBe(true);

  store.dispose();
});
```

Selectors are reused in assertions: they are the same named projections components read, so the
test exercises them without testing them separately.

## Component tests

Components that read a store render inside its provider, or inside its context with a store built
from fake dependencies:

```tsx
const store = createChecklistStore('c1', fakeDeps);
await render(
  <ChecklistContext.Provider value={store}>
    <ChecklistItemRow itemId="i1" />
  </ChecklistContext.Provider>,
);
```

Use `fusion-framework-testing` for `render`/fixture setup and `fusion-framework-mocking` when the
provider reads Fusion modules (HTTP clients, context, app state).
