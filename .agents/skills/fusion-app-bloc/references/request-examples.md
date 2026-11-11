# State ownership request examples

A recommended pattern for frontend state in Fusion Framework React apps. It borrows the
separation of the [BLoC architecture](https://bloclibrary.dev/architecture/) — presentation,
business logic, data; events in, state out — and implements it with the primitives
`@equinor/fusion-observable` already ships: actions, a reducer, an observable state subject, and
flows. Components **read streams** and **write actions**.

It is a pattern, not a mandate. **Proportionality comes first**: most state never needs a store.

## When to use

Typical triggers:
- "Where should this state live?" / "Should this be a store, a context, or `useState`?"
- "I'm passing `items` and `onSave` through three components — fix the prop drilling"
- "Move the fetching/saving logic out of this component"
- "Add a store for this editing workflow" / "Add a flow that saves on change"
- "This component is 600 lines with 12 hooks — split it"
- "My store stops reacting after the first load" / "the error banner flashes on mount" / "the page
  freezes after I added a selector"
- "Audit `src/` for state-management smells"

Implicit triggers:
- A component holds several `useState` plus `useEffect` calls that fetch, persist, poll, or debounce
- A `Props` type is dominated by domain state and callbacks forwarded unchanged
- Code imports `createState`, `createReducer`, `addFlow`, `filterAction`, `switchMapAction`,
  `useObservableState`, or `useObservableSelector` from `@equinor/fusion-observable`

## Example

User: "`ChecklistPage` passes `items`, `readOnly`, and `onToggle` through `Sections` and
`SectionList` to `ItemRow`, and saves in a `useEffect`."

Agent:
1. Classifies `items` as workflow state, `readOnly` as derived, `onToggle` as an action-wrapping
   callback, and the effect as a persistence flow.
2. Chooses rung 5 (several writers plus persistence). If the save is really a one-shot submit and
   no store exists, offers rung 2 + rung 4 instead and asks which the user prefers.
3. Adds a store with `toggleItem`/`save` actions, a `canEdit` selector, and a save flow; `ItemRow`
   receives only `itemId` and calls `useChecklistSelector(...)` and `useChecklist().actions`.
4. Adds one lifecycle test and reports the removed props.

Avoid: wrapping the page in a context that holds five `useState` values and a `useMemo` object, or
creating a store for the page's "expand all" toggle.


## Companion ownership

The original query pointer `references/using-react-query.md` belongs to `fusion-developer-app`,
not this package. Route query work by installed companion identity; this path is provenance,
not a BLoC-local file to read.
