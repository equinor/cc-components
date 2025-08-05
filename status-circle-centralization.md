# Status Circle Function Centralization

This document outlines how to replace all occurrences of the duplicated `getStatusCircle` function with the new centralized version.

## Steps for each file

For each file below, make the following changes:

1. Remove the individual `getStatusCircle` function implementation
2. Remove the imports for `GreenStatusIcon`, `GrayStatusIcon`, `RedStatusIcon`, and `OrangeStatusIcon`
3. Add an import for `getStatusCircle` from `@cc-components/shared`

## Affected files

1. `/Users/edward.brunton/repos/cc-components/libs/workorderapp/src/lib/ui-garden/Item.tsx` (already updated)
2. `/Users/edward.brunton/repos/cc-components/libs/handoverapp/src/lib/ui-garden/Item.tsx`
3. `/Users/edward.brunton/repos/cc-components/libs/heattraceapp/src/lib/ui-garden/Item.tsx`
4. `/Users/edward.brunton/repos/cc-components/libs/loopapp/src/lib/ui-garden/Item.tsx`
5. `/Users/edward.brunton/repos/cc-components/libs/mechanicalcompletionapp/src/lib/ui-garden/Item.tsx`
6. `/Users/edward.brunton/repos/cc-components/libs/pipingapp/src/lib/ui-garden/Item.tsx`
7. `/Users/edward.brunton/repos/cc-components/libs/punchapp/src/lib/ui-garden/PunchGardenItem.tsx`

## Build instructions

After making all the changes, rebuild the shared package:

```bash
cd /Users/edward.brunton/repos/cc-components
pnpm build --filter=@cc-components/shared
```

Then rebuild the affected packages:

```bash
pnpm build --filter=@cc-components/workorderapp
pnpm build --filter=@cc-components/handoverapp
pnpm build --filter=@cc-components/heattraceapp
pnpm build --filter=@cc-components/loopapp
pnpm build --filter=@cc-components/mechanicalcompletionapp
pnpm build --filter=@cc-components/pipingapp
pnpm build --filter=@cc-components/punchapp
```
