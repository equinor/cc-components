---
name: new-app
description: "Scaffold a new CC application with its shared and sidesheet libraries. USE FOR: creating new Fusion apps via NX generator, manual shared/sidesheet lib creation, dependency wiring, app entry point setup, app.config.js files. DO NOT USE FOR: editing existing app configs (use workspace-config skill), column definitions (use table-config skill), sidesheet UI (use sidesheet skill)."
---

# New App / Library Setup

## Scaffolding via NX Generator

The preferred way to create a new app:

```bash
pnpm new:app       # Creates apps/<name>/ + libs/<name>app/
```

This runs the NX generator at `libs/plugins/src/generators/fusion-app-generator/` which scaffolds:

| Output | Contents |
|--------|----------|
| `apps/<name>/` | `main.tsx`, `package.json`, `app.config.js`, `app.config.local.js`, `vite.config.ts`, `tsconfig.json` |
| `libs/<name>app/` | `package.json`, `tsconfig.json`, `tsconfig.lib.json`, `src/index.ts` |

## What the Generator Does NOT Create

You must manually create these additional packages:

| Package | Purpose | Naming |
|---------|---------|--------|
| `libs/<name>shared/` | Types + status utilities shared between app and sidesheet | `@cc-components/<name>shared` |
| `libs/<name>sidesheet/` | Sidesheet UI components and data hooks | `@cc-components/<name>sidesheet` |

## Manual Package Structure

### `libs/<name>shared/`

```
libs/<name>shared/
├── package.json
├── tsconfig.json
├── tsconfig.lib.json
└── src/
    ├── index.ts
    └── lib/
        ├── index.ts
        ├── types/
        │   ├── index.ts
        │   └── <entity>.ts          # Main entity type
        └── utils-statuses/
            ├── index.ts
            └── get<Entity>Status.ts  # Status color mapping
```

**`package.json`:**
```json
{
  "name": "@cc-components/<name>shared",
  "version": "0.0.1",
  "type": "module",
  "private": true,
  "scripts": { "build": "tsc -b -f" },
  "module": "./dist/src/index.js",
  "main": "./dist/src/index.js",
  "types": "./dist/src/index.d.ts"
}
```

### `libs/<name>sidesheet/`

```
libs/<name>sidesheet/
├── package.json
├── tsconfig.json
├── tsconfig.lib.json
└── src/
    ├── index.ts
    └── lib/
        ├── index.ts
        ├── types/
        │   └── <entity>Detail.ts
        ├── ui-sidesheet/
        │   ├── index.ts
        │   ├── <Entity>Sidesheet.tsx
        │   └── DetailsTab.tsx
        └── utils-sidesheet/
            ├── index.ts
            └── use<Entity>.ts        # Data fetching hooks
```

### `libs/<name>app/src/lib/config/`

After generator, add the config files:

```
libs/<name>app/src/lib/config/
├── index.ts
├── workspace.tsx          # WorkspaceWrapper component
├── frameworkConfig.ts     # Fusion framework setup
├── tableConfig.tsx        # AG Grid column definitions
├── gardenConfig.ts        # Garden view config
├── sidesheetConfig.tsx    # Sidesheet wiring
└── statusBarConfig.ts     # KPI status bar
```

## Wiring Dependencies

In `libs/<name>app/package.json`, add:

```json
{
  "dependencies": {
    "@cc-components/shared": "workspace:^",
    "@cc-components/sharedcomponents": "workspace:^",
    "@cc-components/<name>shared": "workspace:^",
    "@cc-components/<name>sidesheet": "workspace:^",
    "@cc-components/modelviewer": "workspace:^"
  }
}
```

In `apps/<name>/package.json`, ensure:

```json
{
  "dependencies": {
    "@cc-components/shared": "workspace:^",
    "@cc-components/<name>app": "workspace:^"
  }
}
```

## App Entry Point (`apps/<name>/src/main.tsx`)

```tsx
import { configure, WorkspaceWrapper } from '@cc-components/<name>app';
import { createRender, RootAppWrapper } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

const <Name>App = () => {
  const client = useHttpClient('cc-app');
  return (
    <RootAppWrapper client={client}>
      <WorkspaceWrapper />
    </RootAppWrapper>
  );
};

export const render = createRender(<Name>App, configure, '<DisplayName>');
export default render;
```

## App Config Files

### `app.config.js` (remote/test API)

```js
import { readFileSync } from 'fs';
const { name } = JSON.parse(readFileSync('./package.json').toString('utf-8'));

export default () => ({
  manifest: { key: name, name },
  environment: {
    uri: 'https://api-cc-applications-test.radix.equinor.com',
    defaultScopes: ['api://ed6de162-dd30-4757-95eb-0ffc8d34fbe0/access_as_user'],
    modelViewerConfig: { /* ... copy from existing app */ },
  },
});
```

### `app.config.local.js` (local API)

Same as above but with `uri: 'https://localhost:7074'`.

## Checklist

- [ ] Run `pnpm new:app` to scaffold app + app lib
- [ ] Create `libs/<name>shared/` with types and status utilities
- [ ] Create `libs/<name>sidesheet/` with sidesheet UI and data hooks
- [ ] Add config files to `libs/<name>app/src/lib/config/`
- [ ] Wire workspace dependencies in `package.json` files
- [ ] Run `pnpm install` to link packages
- [ ] Verify `pnpm build` succeeds
