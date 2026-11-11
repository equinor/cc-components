# Extraction recipe: move workflow state out of a component

Use when a component owns workflow state, effects, or forwarded props that the proportionality
ladder says belong to a store (rung 5). If the ladder points to a lower rung, apply that instead:
replace hand-rolled fetching with React Query, let a nested child call an existing store hook, or
add a small provider.

1. **Inventory.** List every `useState`, `useEffect`, data-holding `useRef`, decision-making
   `useMemo`, and every prop the component receives or forwards. Classify each as
   *ephemeral view*, *workflow*, *server cache*, or *derived*.
2. **Model state.** Workflow entries become one state type with an explicit `status` union.
   Derived entries become named selectors. Server-cache entries stay React Query hooks, or become
   an injected dependency when a flow needs them. Ephemeral view entries stay `useState`.
3. **Name the events.** Each handler that changes workflow state becomes an action named for user
   or lifecycle intent (`toggleItem`, `save`, `observe`), not for the field it sets.
4. **Move effects to flows.** Each effect that fetches, persists, debounces, polls, or retries
   becomes a flow with injected dependencies and an operator that states its concurrency. Effects
   that only touch the DOM (focus, scroll, measurement) stay in the component.
5. **Provide.** Mount the provider at the lowest route or layout that owns the lifetime, and add
   `useX` and `useXSelector`.
6. **Flatten the tree.** Delete forwarded props; each child calls the hooks it needs. Split a god
   component along the seams the deleted props revealed. Props keep only identity, static
   configuration, and presentation values.
7. **Test the contract.** Add or extend the store's lifecycle test (`testing-the-store.md`).
   Existing component tests should keep passing and need fewer props.

Migrate **one seam per pull request**. A store can start as reducer cases only and gain flows later.
A refactor should not change user-visible behavior; if browser journeys or help screenshots must
change, it is not a pure refactor — say so.

## Before and after

Before — the component owns loading, saving, and derived state, and forwards it all:

```tsx
const ChecklistPage = ({ checklistId }: { checklistId: string }) => {
  const client = useHttpClient('checklists');
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<unknown>(null);
  useEffect(() => {
    client.json<Checklist>(`/checklists/${checklistId}`).then(setChecklist, setError);
  }, [client, checklistId]);
  const readOnly = useMemo(() => saving || !checklist, [saving, checklist]);
  // ...toggle and save handlers that call setChecklist / setSaving / setError
  return <Sections items={checklist?.items ?? []} readOnly={readOnly} onToggle={toggle} onSave={save} />;
};
```

After — the page mounts the provider; leaves read and write for themselves:

```tsx
const ChecklistPage = ({ checklistId }: { checklistId: string }) => (
  <ChecklistProvider checklistId={checklistId}>
    <ChecklistToolbar />
    <Sections />
  </ChecklistProvider>
);
```

`Sections` reads `useChecklistSelector(selectItems)` and renders `<ChecklistItemRow itemId={id} />`;
`ChecklistToolbar` reads `canSave` and calls `useChecklist().actions.save`. See
`store-anatomy.md` for the store itself.
