---
domain: reports-architecture
related: [ads-reports, power-bi-embedding]
---

# CC Reports — Mental Model

Power BI analytics apps that live under `reports/*` in `equinor/cc-components`. Each is a thin
Fusion-framework app shell that embeds a single Power BI report inside a Fusion Workspace. They
are distinct from the workspace apps under `apps/*` (which have grid/garden/sidesheet). Reports
render **only** a Power BI tab.

## report-app-shell

- OWNS: one deployable Fusion app bundle per report under `reports/<name>`
- READS FROM: `@cc-components/reportshared` (`Report`, `configure`, `RootAppWrapper`, `createRender`)
- WRITES TO: `dist/app-bundle.*` ES module consumed by the Fusion Project Portal
- INVARIANT: `src/main.tsx` is the entire app — it renders `<RootAppWrapper><Report reportId={...} /></RootAppWrapper>` and exports `render = createRender(Wrapper, configure([...contextTypes]))`
- INVARIANT: the only per-report inputs are the `reportId` string and the list of context types passed to `configure(...)`
- INVARIANT: build is `tsc -b -f` then Vite lib build (`vite.config.ts`, `appType: 'custom'`, `formats: ['es']`, entry `./src/main.tsx`, output `app-bundle`), using the shared `InjectProcessPlugin` from `patches/process`
- DECIDED: all report logic is centralized in `@cc-components/reportshared` so individual report folders stay near-empty (just `main.tsx`, `vite.config.ts`, `tsconfig.json`, `package.json`); adding a report = copy a folder and change `reportId` + context types

## reportshared-package

- OWNS: `libs/reportshared` (`@cc-components/reportshared`) — every report's shared runtime
- READS FROM: `@equinor/workspace-fusion` (local lib), `@equinor/fusion-framework-react-app` (bookmark/http), `@equinor/fusion-framework-react-module-context`, `@tanstack/react-query`
- WRITES TO: public exports in `src/index.ts` — `Report` (= `FusionReport`), `configure`, `createRender`, `RootAppWrapper`
- INVARIANT: only these four symbols are exported; report folders must not reach into internal paths
- FLOW: `main.tsx` → `RootAppWrapper` (context guard + QueryClient + ErrorBoundary) → `FusionReport` → `<Workspace>` with `powerBiModule`

## createRender-bootstrap

- OWNS: the Fusion app entry facade (`src/fusion-framework/createRender.tsx`)
- READS FROM: `makeComponent` from `@equinor/fusion-framework-react-app`, the app React component, and Fusion `ComponentRenderArgs`
- WRITES TO: a `(el, args) => teardown` render function; mounts a React 19 `createRoot` and returns an unmount teardown
- INVARIANT: this is the shared bootstrap for every report; do not hand-roll `createRoot` in report folders

## configure-framework

- OWNS: per-report Fusion module enablement (`src/fusion-framework/frameworkConfig.ts`)
- READS FROM: the array of context type strings passed from `main.tsx` (e.g. `['ProjectMaster']` or `['Facility','ProjectMaster']`)
- WRITES TO: `enableBookmark(config)` and `enableContext(config, ...)` with `setContextType(contextTypes)` and an OData `setContextParameterFn` (search + `type in [...]`)
- INVARIANT: bookmark and context modules are always enabled; the report is context-driven and cannot render without a selected context
- TENSION: analytics is NOT enabled here today — the Fusion portal is expected to provide the `analytics` module at runtime (see `power-bi-embedding.md`)

## root-app-wrapper

- OWNS: the top-level UI guard (`src/components/RootAppWrapper.tsx`)
- READS FROM: `useFusionContext()` (= `useModuleCurrentContext().currentContext`)
- WRITES TO: renders "Please select a context" when no context; otherwise `StrictMode` + `QueryClientProvider` + `ErrorBoundary` (reset keyed on `context.id`) + `StyledDefaultLayout`
- INVARIANT: no context selected ⇒ the report never mounts; the `ErrorBoundary` fallback is a bare "Report crashed"

## service-discovery-http

- OWNS: creation of the authenticated `reports` HTTP client (`src/hooks/useServiceDiscovery.ts`, consumed by `usePbiHelpers.ts`)
- READS FROM: `useFramework().modules.serviceDiscovery`
- WRITES TO: `serviceDisco.createClient('reports')` → `IHttpClient` scoped to the CC reports backend
- INVARIANT: the only registered service-disco type is `'reports'`
- FLOW: hook → `createClient('reports')` → `client.fetch('reports/<reportUri>/...')`

## report-backend-contract

- OWNS: the report backend endpoints consumed via the `reports` client (`usePbiHelpers.ts`, `useReportErrorInfo.ts`, `ReportMeta.tsx`)
- READS FROM: `reports/<id>/config/embedinfo` (embed url + reportId), `reports/<id>/token` (Power BI token + `expirationUtc`), `reports/<id>` (`ReportInfo` metadata), `reports/<id>/contexts/<externalId>/contexttypes/<typeId>/checkaccess` (OPTIONS access probe), plus `rlsrequirements` / `description/content` / `accessdescription/content` for error UX
- WRITES TO: `EmbedInfo`, `EmbedToken`, `ReportInfo` typed objects (`src/types/types.ts`)
- INVARIANT: `getEmbed` fires the access check (`checkAccess`, OPTIONS) in parallel with `embedinfo` and awaits it before returning; a `403` throws with the `Response` as `error.cause`
- FLOW[error-UX]: a thrown error with `Response` cause of `401/403` → `ErrorComponent` renders `AccessErrorComponent` (which uses `useReportErrorInfo` to fetch RLS/description/owner); other errors → "Failed to load report"

## report-bookmarks

- OWNS: bookmark capture/restore for the embedded report (`src/hooks/useWorkspaceBookmark.ts`)
- READS FROM: `useCurrentBookmark` / `useBookmark` from `@equinor/fusion-framework-react-app/bookmark`
- WRITES TO: `currentBookmark` (payload), `bookmarkKey` (id), and an `onBookmarkChange` setter passed to `<Workspace>`
- INVARIANT: the `<Workspace key={contextId + bookmarkKey}>` remounts when context or bookmark id changes, so a bookmark load fully re-initializes the report
- FLOW: Power BI page/visual/bookmark state is captured by the `powerBiModule` and stored into the workspace bookmark payload's `powerBi` field (see `power-bi-embedding.md`)

## report-inventory

- OWNS: the set of reports and their context typing
- INVARIANT: ADS reports (`configure(['ProjectMaster'])`, ProjectMaster-only): `ads-schedule-viewer`, `ads-weekly-meeting`, `ads-monthly-meeting`, `ads-commercial-meeting`, `ads-engineering-meeting`, `ads-offshore-installation` (reportId `ads-offshore-installation-trends`)
- INVARIANT: most non-ADS reports use `configure(['Facility','ProjectMaster'])` (e.g. `checklist`, `tags`, `ccoverview`, `activities`, `atex-inspection`, `commissioning-task`, `preservation-workspace`, `query-workspace`, `workorder-area-overview`, `projectsafetybarriers`, `completion-analytics` (reportId `pp-cch-overview`))
- INVARIANT: the folder name and the `reportId` are NOT always identical — always read `main.tsx` for the real `reportId`

## report-deploy

- OWNS: PR-preview and production release of each report bundle
- READS FROM: `github-action/src/releasePr.ts` (`pr:deploy`) and `github-action/src/releaseMain.ts` (`fprd:deploy`), invoked via each report's `package.json` scripts
- INVARIANT: report `package.json` scripts are uniform: `dev` (`fusion-framework-cli app dev`), `build` (`tsc -b -f`), `pr:deploy`, `fprd:deploy`
