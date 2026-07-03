---
domain: ads-reports
related: [reports-architecture, power-bi-embedding]
---

# ADS Reports — Domain Knowledge

The **ADS** reports are a subset of CC reports under `reports/ads-*` (the `ads-` prefix; the
"ADS" label is used by the business — expansion not asserted here). They embed Power BI reports
scoped to a **ProjectMaster** context and are the subject of `equinor/cc-toolbox#4792` (enable
user-interaction tracking in the embedded reports).

## ads-report-set

- OWNS: the ADS report app shells under `reports/`
- INVARIANT: all ADS reports call `configure(['ProjectMaster'])` — ProjectMaster context only (unlike most other reports which also allow `Facility`)
- INVARIANT: the members and their `reportId`s are:
  - `ads-schedule-viewer` → `ads-schedule-viewer`
  - `ads-weekly-meeting` → `ads-weekly-meeting`
  - `ads-monthly-meeting` → `ads-monthly-meeting`
  - `ads-commercial-meeting` → `ads-commercial-meeting`
  - `ads-engineering-meeting` → `ads-engineering-meeting`
  - `ads-offshore-installation` → `ads-offshore-installation-trends` (folder name ≠ reportId)
- INVARIANT: each shell is identical except `reportId`; they share the entire runtime from `@cc-components/reportshared` (see `reports-architecture.md`)

## ads-context-scoping

- OWNS: how an ADS report is filtered to the selected project
- READS FROM: `currentContext.type.id === 'ProjectMaster'` → `pbi_context_mapping.ProjectMaster` = `{ table: 'Dim_ProjectMaster', column: 'ProjectMaster GUID' }`
- WRITES FROM: a Power BI `IBasicFilter` with `values: [context.externalId]` applied to the embedded report
- INVARIANT: the report will not render without a ProjectMaster context selected (guarded by `RootAppWrapper`)

## ads-interaction-tracking (cc-toolbox#4792)

- OWNS: the feature to track user interactions in embedded ADS Power BI reports
- DECIDED: implement by threading a `useTrackFeature`-backed `eventHandlers` map from `reportshared`
  down to `<PowerBIEmbed>` (full mechanism documented in `power-bi-embedding.md` → `interaction-tracking`)
- INVARIANT: reuse `fusion-core-apps/apps/pbi-template` event names and payloads verbatim for cross-app
  consistency — `fusion-pbi:${event}` where event ∈ `{loaded, rendered, error, buttonClicked, pageChanged, dataSelected}`
- INVARIANT: scope is **ADS reports only** (confirmed with requester) — the threading approach naturally
  limits tracking to reports because only `reportshared` supplies the handler map; `apps/*` workspace
  Power BI tabs are unaffected
- TENSION: verification requires the Fusion portal's `analytics` provider at runtime; `useTrackFeature`
  silently no-ops (emits a telemetry exception) if absent. Verify via `pnpm serve ads-schedule-viewer`
  and confirm `trackFeature` fires on load/render/page-change/visual-click before closing the issue

## reference-implementation

- OWNS: the canonical pattern being mirrored
- READS FROM: `equinor/fusion-core-apps` `apps/pbi-template`:
  - `src/component/hooks/usePBIEventHandlers.ts` — builds the `Map<string, EventHandler>` and calls `trackFeature`
  - `src/component/components/PowerBIReportView/PowerBIReportView.tsx` — passes `eventHandlers` to `<PowerBIEmbed>`
  - `src/module/pbi/store/types.ts` — the `PowerBIEmbedEvents` enum (`loaded`/`rendered`/`error`/`buttonClicked`/`pageChanged`/`dataSelected`)
- INVARIANT: cc-components has no shared `PowerBIEmbedEvents` enum; define a local one in `reportshared`
  matching those string values exactly
