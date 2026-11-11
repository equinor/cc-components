# Smell catalog and audit

Auditing is evaluation, not refactoring. Do not change code during an audit; turn findings into a
report, and into issues only when the user asks.

## Smells

| Smell | Signal | Lowest fix |
| --- | --- | --- |
| Whole-state subscription | `useObservableState(store.subject)` in a component | `useXSelector(namedSelector)` per value |
| Prop propagation | a prop forwarded unchanged through two or more levels; a `Props` type dominated by domain state and callbacks | the child reads the store itself (rung 3), or a small provider (rung 4) |
| Action-wrapping callback prop | `onX={(…) => store.actions.x(…)}` passed down | the child calls `useX().actions.x` |
| Effect-synced state | `useEffect` whose body only calls a setter from props or other state | a selector, or compute in render |
| Workflow in an effect | `useEffect` that fetches, persists, polls, or debounces | `useQuery` for plain reads; a flow for workflows |
| Hand-rolled async status | `useState` for `isSubmitting` / `error` around an `await` | `useMutation`, or an async action |
| Hand-rolled provider | a context provider holding several `useState`, `useCallback`, and a `useMemo` value | a store plus provider (rung 5), or a smaller provider of one stable value (rung 4) |
| Module-level mutable state | `let pending` or a `new Set()` of subscribers at module scope | a store (one subject, many readers) |
| Inline domain decision | `useMemo` or JSX expression computing status, permission, or available commands | a named selector |
| Unstable selector or comparator | an inline arrow passed to a selector hook or as `compare` | a module-level or memoised reference |
| Completing or uncaught flow | a flow not starting from `action$`, or `catchError` missing on the inner request | see `flow-pitfalls.md` |
| Over-engineered state | a store, provider, or factory for a toggle, a dialog, or a single read | step down the ladder |
| God component | far more lines or hooks than its siblings (for example 400+ lines or 8+ hooks) | split along prop seams into stateless parts |

The last two rows matter as much as the rest: report over-engineering, not only missing structure.

## Sniff the codebase

Rank candidates before reading code. Run from the app's source root (adjust the path):

```sh
cd src
# Hook density per component
for f in $(find . -name '*.tsx' ! -name '*.test.tsx'); do
  s=$(grep -c 'useState\b' "$f"); e=$(grep -c 'useEffect\b' "$f")
  echo "$((s + e)) useState=$s useEffect=$e $f"
done | sort -rn | head -20
# Whole-state subscriptions
grep -rn 'useObservableState(.*\.subject)' --include=*.tsx .
# Callback props per file
grep -cE '\bon[A-Z][A-Za-z]+=\{' $(find . -name '*.tsx' ! -name '*.test.tsx') | sort -t: -k2 -rn | head -15
# Hand-rolled contexts and module-level subscriber sets
grep -rnE 'createContext|new Set<\(' --include=*.ts --include=*.tsx . | grep -v '\.test\.'
# Deprecated Fusion Observable APIs
grep -rnE 'useObservableSelectorState|addEpic|useObservableEpic' --include=*.ts --include=*.tsx .
```

These commands are read-only. Read the top hits and classify each against the smells, the core
rules, and the proportionality ladder before proposing a fix.

## Report findings

For each finding report: smell, file and line, the lowest rung that fixes it, and the blast radius.

## From findings to issues (only when asked)

1. **Group** findings into candidates one pull request can land: one seam, one store, or one
   consolidation.
2. **Size the blast radius** of each candidate: files and line counts; non-test importers of each
   changed module (barrel re-exports included); component tests and the store's lifecycle test that
   must keep passing; browser journeys or help screenshots that exercise the area; open issues and
   pull requests touching the same files.
3. **Rank** by smell severity against blast radius; prefer low-risk, high-leverage candidates first
   (for example a shared selector hook that unblocks later splits).
4. **Draft** one issue per candidate under a parent tracking issue using `fusion-issue-authoring`.
   State the rung chosen, acceptance criteria as observable outcomes (no whole-store subscription,
   no forwarded props, tests and journeys unchanged), and overlap with in-flight work. Publish only
   after the user confirms.
