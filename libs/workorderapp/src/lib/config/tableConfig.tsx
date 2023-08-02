import {
  DescriptionCell,
  LinkCell,
  ProgressCell,
  StatusCell,
  StyledMonospace,
  YearAndWeekCell,
} from '@cc-components/shared';
import { defaultGridOptions, useGridDataSource } from '@cc-components/shared/workspace-config';
import {
  WorkOrder,
  getMatStatusColorByStatus,
  getMccrStatusColorByStatus,
} from '@cc-components/workordershared';
import { tokens } from '@equinor/eds-tokens';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { ICellRendererProps } from '@equinor/workspace-ag-grid';
import { FilterState } from '@equinor/workspace-fusion/filter';
import { ColDef, GridConfig } from '@equinor/workspace-fusion/grid';

export const useTableConfig = (contextId: string): GridConfig<WorkOrder, FilterState> => {
  const client = useHttpClient('cc-app');

  const { getRows, colDefs } = useGridDataSource(async (req) => {
    const res = await client.fetch(`/api/contexts/${contextId}/work-orders/grid`, req);
    const meta = await res.json();

    return {
      rowCount: meta.rowCount,
      items: meta.items,
      columnDefinitions: meta.columnDefinitions,
    };
  }, columnDefinitions);

  return {
    getRows: getRows,
    gridOptions: {
      ...defaultGridOptions,
      onFirstDataRendered: (e) => {
        e.columnApi.autoSizeColumns(
          e.columnApi
            .getAllDisplayedColumns()
            .filter((s) => s.getColId() !== 'description')
        );
      },
    },
    columnDefinitions: colDefs as [ColDef<WorkOrder>, ...ColDef<WorkOrder>[]],
  };
};

const columnDefinitions: [ColDef<WorkOrder>, ...ColDef<WorkOrder>[]] = [
  {
    colId: 'WorkOrderNumber',
    field: 'Workorder',
    valueGetter: (pkg) => pkg.data?.workOrderNumber,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string>) => {
      if (!props.data?.workOrderUrl) {
        return <StyledMonospace>{props.value}</StyledMonospace>;
      }
      return <LinkCell url={props.data?.workOrderUrl} urlText={props.value} />;
    },
  },
  {
    field: 'Description',
    colId: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 300,
  },
  {
    colId: 'DisciplineCode',
    field: 'Discipline',
    valueGetter: (pkg) => pkg.data?.discipline,
  },
  {
    colId: 'MilestoneCode',
    field: 'Milestone',
    valueGetter: (pkg) => pkg.data?.milestoneCode,
  },
  {
    colId: 'JobStatus',
    field: 'Job status',
    valueGetter: (pkg) => pkg.data?.jobStatus,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string>) => {
      return <StyledMonospace>{props.data?.jobStatus}</StyledMonospace>;
    },
  },
  {
    colId: 'MaterialStatus',
    field: 'Material',
    valueGetter: (pkg) => pkg.data?.materialStatus,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
      if (props.value) {
        const statusColor = getMatStatusColorByStatus(props.value);
        return (
          <StatusCell
            content={props.value}
            cellAttributeFn={() => ({
              style: { backgroundColor: statusColor },
            })}
          />
        );
      } else return null;
    },
  },
  {
    colId: 'HoldBy',
    field: 'Hold',
    valueGetter: (pkg) => pkg.data?.holdBy,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
      if (props.value) {
        return (
          <StatusCell
            content={props.value}
            cellAttributeFn={() => ({
              style: {
                backgroundColor: tokens.colors.interactive.danger__resting.hsla,
              },
            })}
          />
        );
      } else return null;
    },
  },
  {
    colId: 'PlannedStartupDate',
    field: 'Planned start',
    valueGetter: (pkg) => pkg.data?.plannedStartupDate,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
      return <YearAndWeekCell dateString={props.value} />;
    },
  },
  {
    colId: 'PlannedFinishDate',
    field: 'Planned finish',
    valueGetter: (pkg) => pkg.data?.plannedFinishDate,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
      return <YearAndWeekCell dateString={props.value} />;
    },
  },
  // {
  //   field: 'Est mhr',
  //   valueFormatter: (pkg) => pkg.context.maxEstHrs,
  //   valueGetter: (pkg) => pkg.data?.estimatedHours,
  //   cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
  //     if (props.node.group) return null;
  //     return (
  //       <EstimateCell
  //         current={Number(props.value ?? '0')}
  //         max={(props.valueFormatted as unknown as number) ?? 0}
  //       />
  //     );
  //   },
  // },
  // {
  //   field: 'Exp mhr',
  //   valueFormatter: (pkg) => pkg.context.maxExpHrs,
  //   valueGetter: (pkg) => pkg.data?.expendedHours,
  //   cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
  //     if (props.node.group) return null;
  //     return (
  //       <EstimateCell
  //         current={Number(props.value ?? '0')}
  //         max={(props.valueFormatted as unknown as number) ?? 0}
  //       />
  //     );
  //   },
  // },
  // {
  //   field: 'Rem mhr',
  //   valueFormatter: (pkg) => pkg.context.maxRemHrs,
  //   valueGetter: (pkg) => pkg.data?.remainingHours,
  //   cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
  //     if (props.node.group) return null;
  //     return (
  //       <EstimateCell
  //         current={Number(props.value ?? '0')}
  //         max={(props.valueFormatted as unknown as number) ?? 0}
  //       />
  //     );
  //   },
  // },
  {
    colId: 'ProjectProgress',
    field: 'Progress',
    valueGetter: (pkg) => pkg.data?.projectProgress,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
      if (!props.value || Number(props.value) === 0) {
        return null;
      }

      return <ProgressCell percentWidth={Number(props.value)} />;
    },
  },
  {
    field: 'MC',
    valueGetter: (pkg) => pkg.data?.mccrStatus,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
      if (!props.value) return null;
      const statusColor = getMccrStatusColorByStatus(props.value);
      return (
        <StatusCell
          content={props.value}
          cellAttributeFn={() => ({
            style: { backgroundColor: statusColor },
          })}
        />
      );
    },
  },
];
