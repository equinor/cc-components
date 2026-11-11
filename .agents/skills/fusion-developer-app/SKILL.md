---
name: fusion-developer-app
description: 'Guides Fusion Framework React app features and integration tests. USE FOR: components, pages, hooks, API integration, modules, React Query, dev-server API mocks/proxies. DO NOT USE FOR: issue/skill authoring, CI/CD, backend changes, secrets, general docs (use fusion-research), test setup (use fusion-framework-testing), test module mocks (use fusion-framework-mocking).'
license: MIT
compatibility: Requires a Fusion Framework React app bootstrapped with @equinor/fusion-framework-cli. Works best when styled-components, @equinor/eds-core-react, and @equinor/fusion-react-* packages are installed.
metadata:
  version: "0.5.2"
  status: active
  owner: "@equinor/fusion-core"
  skills:
    - fusion-research
    - fusion-code-conventions
    - fusion-framework-testing
    - fusion-framework-mocking
  tags:
    - fusion-framework
    - react
    - eds
    - fusion-react-components
    - styled-components
    - app-development
    - charts
    - ag-charts
    - feature-flag
    - testing
    - mocking
  mcp:
    suggested:
      - fusion
---

# Fusion App Development

## When to use

Build Fusion Framework React features: components/hooks/services/types/pages, APIs, modules,
settings/bookmarks/analytics/flags, grids/charts/person UI and behavior tests.
Includes `*.test.ts` / `*.test.tsx`, `vitest.config.ts`, fixtures, `app.config.ts`,
`@equinor/fusion-react-*`, styled-components, `chart.js`, `react-chartjs-2`.

## When not to use

Not backend, CI/CD, deployment config or architecture docs (use ADR template).
Issue/skill authoring: `fusion-issue-authoring` / `fusion-skill-authoring`.
Package ownership/hook behavior/examples: `fusion-research` first.
Test setup/rendering: `fusion-framework-testing`; module state: `fusion-framework-mocking`.
Dev-server API mocks/proxies remain here, not test-time mocks.

## Required inputs

- Feature and placement: layer, parent/sibling context.
- When relevant: endpoints, design/layout, module, per-user/bookmark/runtime state,
  test layer and boundaries to seed.
- Ambiguous: read `assets/follow-up-questions.md` for domain questions before implementing.

## Safety & constraints

This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.

- Repo-local commit/validation/changeset/release/PR rules win; inline conventions are defaults.
- No secrets/credentials in source, config, assets, settings, bookmarks or analytics.
- Dependencies need justification and explicit approval. No infrastructure files unless asked.
- Use React, not direct DOM manipulation. TypeScript strict; no `any` types.
- Verify uncertain Fusion APIs against Fusion MCP via `fusion-research` before coding; invent none.
  Missing required companion: report and stop dependent work, never silently fall back.
- Test changed behavior. No real credentials/tenants/production services or accidental network in tests.
  Await Fusion render/hook helpers; answer every expected offline request.
  Never weaken coverage or hide flakes with sleeps, retries, `.skip`, or `.only`.
  Report exact commands/outcomes; “no matching tests” is not success.
- Publishing/destructive actions need explicit confirmation first.

## Instructions

### Step 1 — Discover project conventions

Read `package.json`, lockfile, `tsconfig.json`, nearby `src/`, `docs/adr/` or `contribute/`,
formatter/linter config (`biome.json`, `.eslintrc`, `prettier`), `app.config.ts`, `app.manifest.ts`. Follow repo package manager/scripts/layers/standards,
not reference defaults. Research uncertain Framework behavior first.

### Step 2 — Plan the implementation

Plan files; shared types before consumers. Follow existing layout.
Choosing layers: read `references/project-structure.md` for placement/import-direction tests.
New app: read `assets/new-app-checklist.md`, `references/create-fusion-app.md` for scaffold/bootstrap.

### Step 3 — Implement following code conventions

Apply project standards; invoke `fusion-code-conventions` for naming, TSDoc, intent comments,
types/style/error handling and convention questions.

### Step 4 — Style with styled-components, EDS, and Fusion React components

Visual changes: EDS first, tokens, accessibility, responsive layout. Custom styling:
styled-components, `Styled` object, `styled()` extensions; inline `style` for one-off tweaks only.
No CSS Modules/global CSS/Tailwind/other CSS-in-JS unless project uses them. Read matching rows below.

### Step 5 — Wire up data fetching (when applicable)

Use named clients with `@equinor/fusion-framework-react-app/*` hooks (`useHttpClient(name)`);
`framework.modules.*` only outside React. Thin `useQuery` hooks; API-path/parameter keys;
client UI state in React. Zod response validation in API layer before cache: external unknown
keys stripped, app-owned strict. Read matching API rows below.

### Step 6 — Configure Fusion modules (when applicable)

Modules: `config.ts`/`AppModuleInitiator`; endpoints: `app.config.ts`; hooks:
`useAppModule`, `useHttpClient`, `useCurrentContext`. Routing: `enableNavigation` plus
Fusion Router DSL (`layout`, `index`, `route`, `prefix`) for code splitting.
When row applies, read its file for setup/examples/constraints. Paths are skill-root-relative.

| Work in scope | Read for implementation guidance |
| --- | --- |
| Custom styling | `references/styled-components.md` |
| EDS styling/accessibility | `references/styling-with-eds.md` |
| Fusion domain UI, person display/selection | `references/using-fusion-react-components.md` |
| HTTP clients/API | `references/configure-services.md` |
| React Query/server state | `references/using-react-query.md` |
| API schemas/contracts | `references/validating-api-contracts.md` |
| Dev-server mocks/proxies only | `references/configure-mocking.md` |
| Context | `references/using-context.md` |
| Router/pages | `references/using-router.md` |
| AG Grid | `references/using-ag-grid.md` |
| Standalone AG Charts | `references/using-ag-charts.md` |
| Integrated charts | `references/using-ag-grid-charts.md` |
| Chart library choice | `assets/charts-decision-matrix.md` |
| People service | `references/using-people-service.md` |
| Settings | `references/using-settings.md` |
| Bookmarks | `references/using-bookmarks.md` |
| Analytics | `references/using-analytics.md` |
| Runtime config/assets | `references/using-assets-and-environment.md` |
| Feature flags | `references/using-feature-flags.md` |
| General modules | `references/using-framework-modules.md` |
| Custom modules | `references/using-custom-modules.md` |

### Step 7 — Add or update tests

Changed behavior or test/config/fixture work: read `references/testing.md` for smallest-layer
public assertions, regression states and execution. Setup/rendering: `fusion-framework-testing`;
module/HTTP state: `fusion-framework-mocking`.

### Step 8 — Validate

Changed files: read `assets/review-checklist.md` for applicable checks and apply
`agents/code-quality.md` before finalizing. Run repo typecheck/lint/format: zero errors/violations;
check exported TSDoc, styling and dependency approval.

## Expected output

Project-layer files, TSDoc on exported functions/components/hooks/types, project styling;
exact typecheck/lint/test outcomes and brief what/why. Report gaps/blockers, never unrun passes.

## Helper agents

When helper scope applies, read and apply Markdown procedure inline if runtime lacks skill-local agents.

| Scope | Helper |
| --- | --- |
| Test creation, maintenance, execution or failures | `agents/testing.md` |
| Framework/bootstrap/config/module integration | `agents/framework.md` |
| Visual component/EDS styling | `agents/styling.md` |
| Page/view structure, layout/empty/loading states | `agents/design.md` |
| Grids/charts/dashboards | `agents/data-display.md` |
| Person display/search/selection | `agents/person-components.md` |
| New/modified files before finalizing | `agents/code-quality.md` |
