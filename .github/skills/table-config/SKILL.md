---
name: table-config
description: "Create AG Grid table configuration for CC apps (tableConfig.tsx, column definitions). USE FOR: useTableConfig hook, useGridDataSource, column definitions with ColDef, cell renderers (LinkCell, StatusCell, ProgressCell, DescriptionCell, YearAndWeekCell), server-side data source, defaultGridOptions, defaultModules, status color mapping, domain name labels. DO NOT USE FOR: workspace wiring (use workspace-config skill), sidesheet UI (use sidesheet skill)."
---

# Table Config

Each CC app defines its AG Grid table in `libs/<appname>app/src/lib/config/tableConfig.tsx`.

## useTableConfig Pattern

```tsx
import {
  LinkCell, StatusCell, ProgressCell, DescriptionCell,
  StyledMonospace, YearAndWeekCell, domainNames,
} from '@cc-components/shared';
import {
  defaultGridOptions, defaultModules, useGridDataSource,
} from '@cc-components/shared/workspace-config';
import { <Entity>, getStatusColor } from '@cc-components/<appname>shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { FilterState } from '@equinor/workspace-fusion/filter';
import {
  ColDef, ColumnsToolPanelModule, GridConfig, ICellRendererProps, MenuModule,
} from '@equinor/workspace-fusion/grid';

export const useTableConfig = (contextId: string): GridConfig<<Entity>, FilterState> => {
  const client = useHttpClient('cc-app');

  const { getRows, colDefs } = useGridDataSource(async (req) => {
    const res = await client.fetch(
      `/api/contexts/${contextId}/<api-route>/grid`, req
    );
    const meta = await res.json();
    return {
      rowCount: meta.rowCount,
      items: meta.items,
      columnDefinitions: meta.columnDefinitions,
    };
  }, columnDefinitions);

  return {
    getRows,
    gridOptions: { ...defaultGridOptions },
    columnDefinitions: colDefs as [ColDef<<Entity>>, ...ColDef<<Entity>>[]],
    modules: defaultModules,
  };
};
```

### Key conventions

- `useGridDataSource` takes a fetch function + initial column definitions
- Returns `{ getRows, colDefs }` — use both in the returned config
- Always spread `defaultGridOptions`
- Always use `defaultModules` from shared
- Column definitions array must be typed as `[ColDef<T>, ...ColDef<T>[]]` (non-empty tuple)

## Column Definitions

Define column definitions as a module-level constant:

```tsx
const columnDefinitions: [ColDef<<Entity>>, ...ColDef<<Entity>>[]] = [
  // columns...
];
```

### Column ID Convention

`colId` must match the backend column name (PascalCase) for server-side sorting/filtering:

```tsx
{ colId: 'WorkOrderNumber', headerName: domainNames.workorder, ... }
```

### Common Cell Renderers

| Renderer | Import from | Use for |
|----------|-------------|---------|
| `LinkCell` | `@cc-components/shared` | Clickable links to ProCoSys |
| `DescriptionCell` | `@cc-components/shared` | Long text with ellipsis |
| `StatusCell` | `@cc-components/shared` | Colored status indicator |
| `ProgressCell` | `@cc-components/shared` | Progress bar |
| `YearAndWeekCell` | `@cc-components/shared` | Date as "YYYY-WW" format |
| `StyledMonospace` | `@cc-components/shared` | Monospace text (IDs, codes) |

### Column Examples

**Link column (entity ID):**
```tsx
{
  colId: 'WorkOrderNumber',
  headerName: domainNames.workorder,
  headerTooltip: domainNames.workorder,
  valueGetter: (pkg) => pkg.data?.workOrderNumber,
  cellRenderer: (props: ICellRendererProps<<Entity>, string>) => {
    if (!props.data?.workorderUrl) {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    }
    return <LinkCell url={props.data.workorderUrl} urlText={props.value ?? undefined} />;
  },
},
```

**Description column:**
```tsx
{
  colId: 'Title',
  headerName: 'Title',
  headerTooltip: 'Title',
  valueGetter: (pkg) => pkg.data?.description,
  cellRenderer: (props: ICellRendererProps<<Entity>, string | null>) =>
    <DescriptionCell description={props.value} />,
  width: 300,
},
```

**Simple text column:**
```tsx
{
  colId: 'DisciplineCode',
  headerName: domainNames.workorderDiscipline,
  headerTooltip: domainNames.workorderDiscipline,
  valueGetter: (pkg) => pkg.data?.discipline,
},
```

**Status color column:**
```tsx
{
  colId: 'MaterialStatus',
  headerName: 'Material Status',
  headerTooltip: 'Material Status',
  valueGetter: (pkg) => pkg.data?.materialStatus,
  cellRenderer: (props: ICellRendererProps<<Entity>, string | null>) =>
    <StatusCell content={props.value} cellAttributeFn={getMatStatusColorByStatus} />,
},
```

**Progress bar column:**
```tsx
{
  colId: 'ProjectProgress',
  headerName: 'Progress',
  headerTooltip: 'Project Progress',
  valueGetter: (pkg) => pkg.data?.projectProgress,
  cellRenderer: (props: ICellRendererProps<<Entity>, number | null>) =>
    <ProgressCell percentWidth={props.value ?? 0} />,
  cellStyle: () => ({ display: 'grid', height: '100%' }),
},
```

## Domain Names

Use `domainNames` from `@cc-components/shared` for consistent header labels across apps instead of hardcoding strings.

## Status Color Functions

Each `<appname>shared` lib exports status-to-color mapping functions. These are used by `StatusCell.cellAttributeFn`.

## Checklist

- [ ] `useTableConfig` returns `GridConfig<<Entity>, FilterState>`
- [ ] `useGridDataSource` fetch URL matches CC API grid endpoint
- [ ] `colId` values match backend column names (PascalCase)
- [ ] Use `domainNames` for standardized header labels
- [ ] Use shared cell renderers, not custom ones
- [ ] Status columns use color mapping from `<appname>shared`
- [ ] Column definitions declared at module level (not inside component)
