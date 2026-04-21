# CC Components — Agent Instructions

Construction & Commissioning (CC) web applications for Equinor's Project Portal.  
Monorepo using **pnpm workspaces**, **Turborepo**, **NX generators**, **React 19**, **TypeScript**, and **Vite**.

## Essential Commands

```bash
pnpm install                    # Install dependencies
pnpm first-time-setup           # First-time: installs global tools + builds
pnpm build                      # Build all (parallel)
pnpm ci:build                   # Build all (sequential, CI-safe)
pnpm serve <appname>            # Dev server (remote API)
pnpm serve:local <appname>      # Dev server (local API)
pnpm watch <appname>            # Build lib + deps in watch mode
pnpm new:app                    # Scaffold new Fusion app (NX generator)
pnpm new:report                 # Scaffold new report (NX generator)
```

App names match folder names under `apps/`: `workorder`, `punch`, `swcr`, `handover`, `heattrace`, `loop`, `mechanicalcompletion`, `piping`.

## Project Structure

```
apps/<appname>/              # Thin app shells (main.tsx + Fusion config)
libs/<appname>app/           # App business logic, workspace config, garden
libs/<appname>shared/        # Types and utilities shared between app + sidesheet
libs/<appname>sidesheet/     # Sidesheet UI for the app
libs/shared/                 # Cross-app shared code (hooks, types, utils, API)
libs/sharedcomponents/       # Cross-app shared React components
libs/workspace/              # Workspace framework packages (ag-grid, garden, etc.)
libs/modelviewer/            # 3D model viewer integration
libs/plugins/                # NX generators for scaffolding
libs/reportshared/           # Shared report utilities
github-action/               # CI/CD deploy scripts
```

### App ↔ Lib Relationship

Each app in `apps/` is a minimal entry point that imports from its corresponding `libs/<appname>app/` package. All logic lives in libs:

- `apps/workorder/src/main.tsx` → imports `@cc-components/workorderapp`
- `@cc-components/workorderapp` → depends on `@cc-components/workordershared` + `@cc-components/workordersidesheet`

### Dependency Rules

- An app library **cannot** import from another app library (e.g., `workorderapp` cannot import from `punchapp`)
- Shared code used by multiple apps belongs in `@cc-components/shared` or `@cc-components/sharedcomponents`
- Each `<appname>shared` lib contains types and status utilities shared between `<appname>app` and `<appname>sidesheet`

## Architecture

Apps are built on [Equinor Fusion Framework](https://github.com/equinor/fusion-framework) and rendered inside the Fusion Project Portal. Each app uses `@equinor/workspace-fusion` to provide:

- **Grid view** — AG Grid data table
- **Garden view** — visual card/lane layout
- **Power BI** — analytics dashboards
- **Sidesheet** — detail panel for selected items
- **Filter** — server-driven filter model
- **Status bar** — summary metrics

App configuration lives in `libs/<appname>app/src/lib/config/`:

| File | Purpose |
|------|---------|
| `workspace.tsx` | Main workspace component wiring all modules |
| `tableConfig.tsx` | AG Grid column definitions and data source |
| `gardenConfig.ts` | Garden view configuration |
| `sidesheetConfig.tsx` | Sidesheet component mapping |
| `statusBarConfig.ts` | Status bar items |
| `frameworkConfig.ts` | Fusion framework module configuration |

### API Pattern

Apps fetch data from the CC API via `@equinor/fusion-framework-react-app/http`:

```typescript
const client = useHttpClient('cc-app');
client.fetch(`/api/contexts/${contextId}/${appName}/...`, req);
```

API access checking uses `useCCApiAccessCheck()` from `@cc-components/shared`.

## Code Conventions

- **Prettier** formatting — config in [.prettierrc](.prettierrc) (single quotes, semicolons, 90 char width)
- **TypeScript strict mode** — `tsconfig.base.json` has `strict: true`
- **ESM only** — all packages use `"type": "module"`
- **Build** — `tsc -b -f` (TypeScript project references, no bundler for libs)
- **Trunk-based development** — branch from `main`, squash merge back
- **Conventional commits** — required for all PRs

## Key Patterns

### Workspace Configuration

Every app follows the same workspace pattern in `workspace.tsx`:

1. Get `contextId` from Fusion context
2. Get `httpClient` from Fusion HTTP module
3. Check API access with `useCCApiAccessCheck`
4. Configure filter, table, garden, status bar, sidesheet
5. Render `<Workspace />` from `@equinor/workspace-fusion`

### Sidesheet Structure

Each sidesheet lib (`libs/<appname>sidesheet/`) contains:

- `ui-sidesheet/` — React components for the sidesheet tabs
- `utils-sidesheet/` — Utility functions and queries
- `types/` — TypeScript interfaces for sidesheet data

### Status Utilities

Each `<appname>shared` lib typically exports status mapping utilities in `utils-statuses/` for consistent status coloring across views.

## Skills & Instructions

| File | When to use |
|------|-------------|
| [workspace-config](.github/skills/workspace-config/SKILL.md) | Creating or editing `workspace.tsx` / `frameworkConfig.ts` |
| [table-config](.github/skills/table-config/SKILL.md) | AG Grid column definitions and `useTableConfig` |
| [sidesheet](.github/skills/sidesheet/SKILL.md) | Sidesheet tabs, data hooks, and detail panels |
| [new-app](.github/skills/new-app/SKILL.md) | Scaffolding a new app with its shared + sidesheet libs |

## References

- [README.md](README.md) — Getting started and project overview
- [CONTRIBUTING.md](CONTRIBUTING.md) — Contribution workflow and code structure rules
- [NX Monorepo Patterns](https://nx.dev/more-concepts/monorepo-nx-enterprise#using-nx-at-enterpriseshere)
