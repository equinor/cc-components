import {
  DescriptionCell,
  LinkCell,
  ProgressCell,
  StatusCell,
  YearAndWeekCell,
} from '@cc-components/shared';
import { tokens } from '@equinor/eds-tokens';
import { ICellRendererProps } from '@equinor/workspace-ag-grid';
import { FilterStateGroup } from '@equinor/workspace-fusion/filter';
import { getMatStatusColorByStatus, getMccrStatusColorByStatus } from '../utils-statuses';
import { GridConfig } from '@equinor/workspace-fusion/grid';
import { WorkOrder } from '@cc-components/workordershared';
import { proCoSysUrls } from '@cc-components/shared';
import { useGridDataSource } from '@cc-components/shared/workspace-config';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { defaultGridOptions } from '@cc-components/shared/workspace-config';

export const useTableConfig = (
  contextId: string,
  boundaryTrigger?: () => void
): GridConfig<WorkOrder, FilterStateGroup[]> => {
  const client = useHttpClient('cc-app');

  const { getRows } = useGridDataSource(async (req) => {
    const res = await client.fetch(`/api/contexts/${contextId}/work-orders/grid`, req);
    const meta = (await res.json()) as { items: any[]; rowCount: number };
    return {
      rowCount: meta.rowCount,
      rowData: meta.items,
    };
  }, boundaryTrigger);

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
    columnDefinitions: [
      {
        field: 'Workorder',
        valueGetter: (pkg) => pkg.data?.workOrderNumber,
        // valueFormatter: (pkg) =>
        //   pkg.data?.workOrderUrlId
        //     ? proCoSysUrls.getWorkOrderUrl(pkg.data.workOrderUrlId)
        //     : '',
        // cellRenderer: (props: ICellRendererProps<WorkOrder, string>) => {
        //   if (props.valueFormatted) {
        //     return <LinkCell url={props.valueFormatted} urlText={props.value} />;
        //   } else return null;
        // },
      },
      {
        field: 'Description',
        colId: 'description',
        valueGetter: (pkg) => pkg.data?.description,
        cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
          return <DescriptionCell description={props.value} />;
        },
        width: 300,
      },
      {
        field: 'Discipline',
        valueGetter: (pkg) => pkg.data?.disciplineCode,
      },
      {
        field: 'Milestone',
        valueGetter: (pkg) => pkg.data?.milestone,
      },
      {
        field: 'Job status',
        valueGetter: (pkg) => pkg.data?.jobStatus,
      },
      {
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
        field: 'Planned start',
        valueGetter: (pkg) => pkg.data?.plannedStartupDate,
        cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
          return <YearAndWeekCell dateString={props.value} />;
        },
      },
      {
        field: 'Planned finish',
        valueGetter: (pkg) => pkg.data?.plannedFinishDate,
        cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
          return <YearAndWeekCell dateString={props.value} />;
        },
      },
      {
        field: 'Planned start',
        valueGetter: (pkg) => pkg.data?.plannedStartupDate,
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
    ],
  };
};
