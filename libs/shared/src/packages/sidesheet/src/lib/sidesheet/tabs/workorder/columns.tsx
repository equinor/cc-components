import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { DateCell } from '../../../../../../table-helpers/src/lib/table/cells/DateCell';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { EstimateCell } from '../../../../../../table-helpers/src/lib/table/cells/EstimateCell';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { ProgressCell } from '../../../../../../table-helpers/src/lib/table/cells/ProgressCell';
import { WorkorderBase } from './types';

export const columns = (
  maxEstimatedHours: number | null,
  maxRemainingHours: number | null
): ColDef<WorkorderBase>[] => {
  return [
    {
      headerName: 'WO',
      valueGetter: (pkg) => pkg.data?.workOrderNumber,
      cellRenderer: (props: ICellRendererProps<WorkorderBase, string | null>) => {
        return (
          <LinkCell
            url={props.data?.workOrderUrl ?? undefined}
            urlText={props.data?.workOrderNumber}
          />
        );
      },
    },
    {
      colId: 'title',
      headerName: 'Title',
      valueGetter: (pkg) => pkg.data?.title,
      cellRenderer: (props: ICellRendererProps<WorkorderBase>) => {
        return <DescriptionCell description={props?.value} />;
      },
      width: 250,
    },
    {
      headerName: 'Discipline',
      valueGetter: (pkg) => pkg.data?.discipline,
    },
    {
      headerName: 'Status',
      valueGetter: (pkg) => pkg.data?.jobStatus,
    },
    {
      headerName: 'Plan. finish',
      valueGetter: (pkg) => pkg.data?.plannedFinishDate,
      cellRenderer: (props: ICellRendererProps<WorkorderBase>) => {
        return <DateCell dateString={props.value} />;
      },
    },
    {
      headerName: 'Act. finish',
      valueGetter: (pkg) => pkg.data?.actualCompletionDate,
      cellRenderer: (props: ICellRendererProps<WorkorderBase>) => {
        return <DateCell dateString={props.value} />;
      },
    },
    {
      headerName: 'Progress',
      valueGetter: (pkg) => pkg.data?.projectProgress,
      cellRenderer: (props: ICellRendererProps<WorkorderBase>) => {
        return <ProgressCell percentWidth={props.value === null ? 0 : props.value} />;
      },
      cellStyle: progressBarCellStyle,
      minWidth: 150,
    },
    {
      headerName: 'Estimated',
      valueGetter: (pkg) => pkg.data?.estimatedHours,
      cellRenderer: (props: ICellRendererProps<WorkorderBase>) => {
        if (maxEstimatedHours === null) {
          const maxCount = 0;
          maxEstimatedHours = maxCount;
        }
        return (
          <EstimateCell
            current={Number(props.value === null ? 0 : props.value)}
            max={maxEstimatedHours}
          />
        );
      },
      cellStyle: progressBarCellStyle,
      minWidth: 150,
    },
    {
      headerName: 'Remaining',
      valueGetter: (pkg) => pkg.data?.remainingHours,
      cellRenderer: (props: ICellRendererProps<WorkorderBase>) => {
        if (maxRemainingHours === null) {
          const maxCount = 0;
          maxRemainingHours = maxCount;
        }
        return (
          <EstimateCell
            current={Number(props.value === null ? 0 : props.value)}
            max={maxRemainingHours}
          />
        );
      },
      cellStyle: progressBarCellStyle,
      minWidth: 150,
    },
  ];
};

const progressBarCellStyle = () => {
  return {
    display: 'grid',
    height: '100%',
  };
};
