---
domain: power-bi-embedding
related: [reports-architecture, ads-reports]
---

# Power BI Embedding Pipeline — Mental Model

How a report's `PowerBiConfig` becomes a live embedded Power BI iframe. Spans three packages:
`@cc-components/reportshared`, `@equinor/workspace-fusion` (local `libs/workspace/fusion`), and
`@equinor/workspace-powerbi` (local `libs/workspace/power-bi`). Both `workspace-*` packages are
**local workspace libraries**, not external npm deps — they can be edited directly.

## end-to-end-flow

- FLOW: `reports/<name>/main.tsx`
  → `reportshared` `FusionReport` (`components/Report.tsx`) builds `powerBiOptions` via `usePBIOptions(reportId, ctxConfig)`
  → `<Workspace powerBiOptions={pbi} modules={[powerBiModule]} usePowerBiFilters>` (`@equinor/workspace-fusion`)
  → `powerBiModule.setup` (`libs/workspace/fusion/src/modules/power-bi/index.tsx`) creates a `PowerBiController` and renders `PowerBiWrapper`
  → `PowerBiWrapper` renders `<PowerBI>` (`@equinor/workspace-powerbi`)
  → `PowerBi.tsx` → `report/Report.tsx` (token + embed queries) → `loadedReport/LoadedReport.tsx`
  → `<PowerBIEmbed>` from `powerbi-client-react` (the actual iframe)

## usePBIOptions (reportshared)

- OWNS: assembly of the `PowerBiConfig` object handed to the workspace (`src/hooks/usePBIOptions.tsx`)
- READS FROM: `usePBIHelpers()` (`getEmbed`, `getToken`), the current Fusion context `externalId`, and an optional `{ table, column }` filter
- WRITES TO: `{ getEmbed, getToken, reportUri, ErrorComponent, filters? }`
- INVARIANT: when a context filter is supplied, `filters` targets `{ column, table }` with `values: [externalId]` — this is how a report is scoped to the selected project/facility
- INVARIANT: `FusionReport` picks the filter table/column from `pbi_context_mapping` by `currentContext.type.id` (`Facility` → `Dim_Facility`/`Facility`; `ProjectMaster` → `Dim_ProjectMaster`/`ProjectMaster GUID`), unless an explicit `config` is passed

## powerBiModule (workspace-fusion)

- OWNS: the Fusion Workspace "Power BI" tab, its custom header, and the bookmark provider (`libs/workspace/fusion/src/modules/power-bi/index.tsx`)
- READS FROM: `props.powerBiOptions` (the `PowerBiConfig`), `props.currentBookmark`, `props.usePowerBiFilters`
- WRITES TO: a `PowerBiController` (with the basic filter), the rendered `<PowerBI>`, and the workspace bookmark payload's `powerBi` field
- INVARIANT: if `powerBiOptions` is undefined the module no-ops (no tab)
- INVARIANT: `createBasicFilter` converts `PowerBiConfig.filters` (`{ target, values }`) into a Power BI `IBasicFilter` (`filterType: 1`, `operator: 'In'`); non-string values are dropped
- FLOW[bookmark-capture]: `PowerBiWrapper` subscribes to `controller.onReportReady`; on the embed it attaches `visualClicked` / `pageChanged` / `rendered` handlers that capture the bookmark state + active page and push it into the workspace bookmark payload (`updatePayload(old => ({ ...old, powerBi }))`)
- TENSION: those three embed handlers exist for bookmark capture only — they do NOT emit analytics. Interaction tracking is a separate concern threaded via `eventHandlers` (see below)

## PowerBiController (workspace-powerbi)

- OWNS: the report-ready callback registry and active-page tracking (`libs/workspace/power-bi/src/lib/classes/powerBiController.ts`)
- READS FROM: the embedded `Report` once loaded, `pageChanged` events
- WRITES TO: `activePage`, `onActivePageChanged` observers, and every registered `onReportReady` callback
- INVARIANT: `reportReady(report)` is called once by `Report.tsx`'s `onReportReady`; it fans out to all registered callbacks and starts tracking the active page

## PowerBi render + token lifecycle (workspace-powerbi)

- OWNS: the embed/token fetch, error boundary, suspense, and iframe mount (`PowerBi.tsx` → `report/Report.tsx` → `loadedReport/LoadedReport.tsx`)
- READS FROM: `getToken(reportUri)` and `getEmbedInfo(reportUri)` (React Query), plus optional `filters`/`bookmark`
- WRITES TO: `<PowerBIEmbed embedConfig={...}>` and, on ready, applies bookmark state or filters and calls `controller.reportReady`
- INVARIANT: the token query auto-refetches just before `expirationUtc` (`generateRefetchInterval`); embed url + reportId come from `getEmbedInfo`
- INVARIANT: `LoadedReport` already emits an AppInsights `PowerBI Report Rendered` event (load-time only) via `window.ai` inside `getEmbeddedComponent`'s `rendered` handler — this is separate from Fusion analytics feature tracking
- INVARIANT: `PowerBiBootstrap` preloads the Power BI iframe JS by bootstrapping a hidden `service.Service` against `https://app.powerbi.com/reportEmbed`

## interaction-tracking (issue cc-toolbox#4792)

- OWNS: user-interaction analytics for embedded ADS reports (the requested feature)
- READS FROM: `useTrackFeature` from `@equinor/fusion-framework-react-app/analytics`
- WRITES TO: `trackFeature('fusion-pbi:<event>', payload)` calls, matching `fusion-core-apps` `pbi-template` naming exactly
- DECIDED: mirror `fusion-core-apps/apps/pbi-template` — a `usePBIEventHandlers` hook builds a `Map<string, EventHandler>` and passes it to `<PowerBIEmbed eventHandlers={...}>`. `powerbi-client-react`'s `PowerBIEmbed` already supports `eventHandlers?: Map<string, EventHandler>`
- INVARIANT: event names (from the shared `PowerBIEmbedEvents` enum) must be exactly `loaded`, `rendered`, `error`, `buttonClicked`, `pageChanged`, `dataSelected`; feature name is `fusion-pbi:${event}`
- INVARIANT: payloads mirror pbi-template — `loaded`/`rendered`/`error`/`buttonClicked`: `{ event: event?.detail, reportId }`; `pageChanged`: `{ newPage: event?.detail.newPage.displayName, reportId }`; `dataSelected`: `{ dataPoints: event?.detail.dataPoints, reportId }`
- DECIDED: because the generic `workspace-*` libs must stay decoupled from Fusion analytics, the `eventHandlers` map is built in `reportshared` (which runs inside a fusion-framework-react-app) and threaded down: `PowerBiConfig.eventHandlers` → `powerBiModule` `PowerBiWrapper` → `<PowerBI eventHandlers>` → `Report` → `LoadedReport` → `<PowerBIEmbed eventHandlers>`. This scopes tracking to ADS reports only (workspace apps don't supply the map)
- TENSION: `useTrackFeature` no-ops safely if the `analytics` provider is absent (it routes a telemetry exception instead) — the Fusion portal provides the provider at runtime, so no `enableAnalytics` call is required in `frameworkConfig.ts`. Verify telemetry actually fires in the portal before assuming it works
