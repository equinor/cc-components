import {
  DescriptionCell,
  LinkCell,
  proCoSysUrls,
  ProgressCell,
  StatusCell,
  YearAndWeekCell,
} from '@cc-components/shared';
import { tokens } from '@equinor/eds-tokens';
import { ICellRendererProps } from '@equinor/workspace-ag-grid';
import { getMatStatusColorByStatus, getMccrStatusColorByStatus } from '../utils-statuses';
import { GridConfig } from '@equinor/workspace-fusion/grid';
import { WorkOrder } from '@cc-components/workordershared';

export const tableConfig: GridConfig<WorkOrder> = {
  columnDefinitions: [
    {
      field: 'Workorder',
      valueGetter: (pkg) => pkg.data?.workOrderNumber,
      valueFormatter: (pkg) =>
        pkg.data?.workOrderId ? proCoSysUrls.getWorkOrderUrl(pkg.data.workOrderId) : '',
      cellRenderer: (props: ICellRendererProps<WorkOrder, string>) => {
        if (props.valueFormatted) {
          return <LinkCell url={props.valueFormatted} urlText={props.value} />;
        } else return null;
      },
      width: 200,
    },
    {
      field: 'Description',
      valueGetter: (pkg) => pkg.data?.description,
      cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
        return <DescriptionCell description={props.value} />;
      },
      width: 100,
    },
    {
      field: 'Discipline',
      valueGetter: (pkg) => pkg.data?.disciplineCode,
      width: 100,
    },
    {
      field: 'Milestone',
      valueGetter: (pkg) => pkg.data?.milestone,
      width: 150,
    },
    {
      field: 'Job status',
      valueGetter: (pkg) => pkg.data?.jobStatus,
      width: 150,
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
      width: 100,
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
      width: 100,
    },
    {
      field: 'Planned start',
      valueGetter: (pkg) => pkg.data?.plannedStartupDate,
      cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
        return <YearAndWeekCell dateString={props.value} />;
      },
      width: 150,
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
    {
      field: 'Est mhr',
      valueGetter: (pkg) => pkg.data?.estimatedHours,
      width: 100,
    },
    {
      field: 'Exp mhr',
      valueGetter: (pkg) => pkg.data?.expendedHours,
      width: 100,
    },
    {
      field: 'Rem mhr',
      valueGetter: (pkg) => pkg.data?.remainingHours,
      width: 100,
    },
    {
      field: 'Progress',
      valueGetter: (pkg) => pkg.data?.projectProgress,
      cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
        if (!props.value || Number(props.value) === 0) {
          return null;
        }

        return <ProgressCell percentWidth={Number(props.value)} />;
      },
      width: 100,
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
      width: 100,
    },
  ],
};
