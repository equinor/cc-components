import {
  DescriptionCell,
  LinkCell,
  ProgressCell,
  StatusCell,
  StyledMonospace,
  YearAndWeekCell,
  domainNames,
} from '@cc-components/shared';
import {
  defaultGridOptions,
  defaultModules,
  useGridDataSource,
} from '@cc-components/shared/workspace-config';
import {
  WorkOrder,
  getMatStatusColorByStatus,
  getMccrStatusColorByStatus,
} from '@cc-components/workordershared';
import { tokens } from '@equinor/eds-tokens';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { FilterState } from '@equinor/workspace-fusion/filter';
import {
  ColDef,
  ColumnsToolPanelModule,
  GridConfig,
  ICellRendererProps,
  MenuModule,
} from '@equinor/workspace-fusion/grid';

const progressBarCellStyle = () => {
  return {
    display: 'grid',
    height: '100%',
  };
};

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
    },
    columnDefinitions: colDefs as [ColDef<WorkOrder>, ...ColDef<WorkOrder>[]],
    modules: defaultModules,
  };
};

const columnDefinitions: [ColDef<WorkOrder>, ...ColDef<WorkOrder>[]] = [
  {
    colId: 'WorkOrderNumber',
    headerName: domainNames.workorder,
    headerTooltip: domainNames.workorder,
    valueGetter: (pkg) => pkg.data?.workOrderNumber,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string>) => {
      if (!props.data?.workorderUrl) {
        return <StyledMonospace>{props.value}</StyledMonospace>;
      }
      return (
        <LinkCell
          url={props.data?.workorderUrl}
          urlText={props.value ?? undefined}
          aiLinkLocation="workorder grid"
          aiLinktype="WorkorderNo"
        />
      );
    },
  },
  {
    headerName: 'Title',
    colId: 'Title',
    headerTooltip: 'Title',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 300,
  },
  {
    colId: 'DisciplineCode',
    headerName: domainNames.workorderDiscipline,
    headerTooltip: domainNames.workorderDiscipline,
    valueGetter: (pkg) => pkg.data?.discipline,
  },
  {
    colId: 'MilestoneCode',
    headerName: domainNames.workorderMilestone,
    headerTooltip: domainNames.workorderMilestone,
    valueGetter: (pkg) => pkg.data?.milestoneCode,
  },
  {
    colId: 'JobStatus',
    headerName: domainNames.jobStatus,
    headerTooltip: domainNames.jobStatus,
    valueGetter: (pkg) => pkg.data?.jobStatus,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string>) => {
      return <StyledMonospace>{props.data?.jobStatus}</StyledMonospace>;
    },
  },
  {
    colId: 'MaterialStatus',
    headerName: domainNames.materialStatus,
    headerTooltip: domainNames.materialStatus,
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
    headerName: domainNames.hold,
    headerTooltip: domainNames.hold,
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
    headerName: 'Planned start',
    headerTooltip: 'Planned Startup Date',
    valueGetter: (pkg) => pkg.data?.plannedStartupDate,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
      return <YearAndWeekCell dateString={props.value ?? null} />;
    },
  },
  {
    colId: 'PlannedFinishDate',
    headerName: 'Planned finish',
    headerTooltip: 'Planned Finish Date',
    valueGetter: (pkg) => pkg.data?.plannedFinishDate,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
      return <YearAndWeekCell dateString={props.value ?? null} />;
    },
  },
  {
    colId: 'ProjectProgress',
    headerName: domainNames.workorderProgress,
    headerTooltip: domainNames.workorderProgress,
    valueGetter: (pkg) => pkg.data?.projectProgress,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string | null>) => {
      if (!props.value || Number(props.value) === 0) {
        return null;
      }

      return <ProgressCell percentWidth={Number(props.value)} />;
    },
    cellStyle: progressBarCellStyle,
    minWidth: 150,
  },
  {
    colId: 'MCStatus',
    headerName: domainNames.mcStatus,
    headerTooltip: domainNames.mcStatus,
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
  {
    colId: 'WorkBreakdownStructure',
    headerName: domainNames.workorderWBS,
    headerTooltip: domainNames.workorderWBS,
    valueGetter: (pkg) => pkg.data?.workBreakdownStructure,
  },
  {
    colId: 'Systems',
    headerName: domainNames.commSystems,
    headerTooltip: domainNames.commSystems,
    valueGetter: (pkg) => pkg.data?.systems,
  },
  {
    colId: 'EstimatedHours',
    headerName: domainNames.remainingManHours,
    headerTooltip: domainNames.remainingManHours,
    valueGetter: (pkg) => pkg.data?.remainingHours,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string>) => {
      if (!props.value) return null;
      return <StyledMonospace>{props.value ?? null}</StyledMonospace>;
    },
  },
  {
    colId: 'RemainingHours',
    headerName: domainNames.estimatedManHours,
    headerTooltip: domainNames.estimatedManHours,
    valueGetter: (pkg) => pkg.data?.estimatedHours,
    cellRenderer: (props: ICellRendererProps<WorkOrder, string>) => {
      if (!props.value) return null;
      return <StyledMonospace>{props.value ?? null}</StyledMonospace>;
    },
  },
];
