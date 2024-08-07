import {
  DescriptionCell,
  LinkCell,
  StatusCell,
  StyledMonospace,
  YearAndWeekCell,
  statusColorMap,
} from '@cc-components/shared';
import { ICellRendererProps } from '@equinor/workspace-ag-grid';
import { FilterState } from '@equinor/workspace-fusion/filter';
import {
  ColDef,
  ColumnsToolPanelModule,
  GridConfig,
  MenuModule,
} from '@equinor/workspace-fusion/grid';
import { McPackage, McStatus } from 'libs/mechanicalcompletionshared';

import { useHttpClient } from '@cc-components/shared';
import {
  GridColumnOption,
  defaultGridOptions,
  useGridDataSource,
} from '@cc-components/shared/workspace-config';

export const useTableConfig = (contextId: string): GridConfig<McPackage, FilterState> => {
  const client = useHttpClient();

  const { getRows, colDefs } = useGridDataSource(async (req) => {
    const res = await client.fetch(
      `/api/contexts/${contextId}/mechanical-completion/grid`,
      req
    );
    const meta = (await res.json()) as {
      items: any[];
      rowCount: number;
      columnDefinitions: GridColumnOption[];
    };
    return {
      rowCount: meta.rowCount,
      items: meta.items,
      columnDefinitions: meta.columnDefinitions,
    };
  }, columnDefinitions);

  return {
    getRows: getRows,
    modules: [MenuModule, ColumnsToolPanelModule],
    columnDefinitions: colDefs as any,
    gridOptions: {
      ...defaultGridOptions,
      onFirstDataRendered: (e) => {
        e.api.autoSizeColumns(
          e.api
            .getAllDisplayedColumns()
            .filter((s) => s.getColId() !== 'description')
        );
      },
    },
  };
};

const columnDefinitions: ColDef<McPackage>[] = [
  {
    headerName: 'MC Pkg',
    colId: 'MCPkgNo',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionPackageNo,
    valueFormatter: (pkg) => pkg.data?.mechanicalCompletionPackageUrl ?? '',
    cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
      if (!props.valueFormatted) {
        return props.value;
      }
      return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
    },
    minWidth: 140,
  },
  {
    headerName: 'Description',
    colId: 'Description',
    headerTooltip: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    minWidth: 300,
  },
  {
    headerName: 'Discipline',
    colId: 'Discipline',
    headerTooltip: 'Discipline',
    valueGetter: (pkg) => pkg.data?.discipline,
    enableRowGroup: true,
    minWidth: 144,
  },
  {
    headerName: 'MC Status',
    colId: 'McStatus',
    headerTooltip: 'Mechanical Completion Status',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionStatus,
    cellRenderer: (props: ICellRendererProps<McPackage, McStatus | null>) => {
      return (
        <StatusCell
          content={props.value as string}
          cellAttributeFn={() => ({
            style: {
              backgroundColor: props.value ? statusColorMap[props.value] : 'transparent',
            },
          })}
        />
      );
    },
    enableRowGroup: true,
    minWidth: 150,
  },
  {
    headerName: 'Responsible',
    colId: 'Responsible',
    headerTooltip: 'Responsible',
    valueGetter: (pkg) => pkg.data?.responsible,
    enableRowGroup: true,
    minWidth: 150,
  },
  {
    headerName: 'Phase',
    colId: 'Phase',
    headerTooltip: 'mechanicalCompletionPhase',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionPhase,
    enableRowGroup: true,
    minWidth: 150,
  },
  {
    headerName: 'Location',
    colId: 'Location',
    headerTooltip: 'Location',
    valueGetter: (pkg) => pkg.data?.location,
    cellRenderer: (props: ICellRendererProps<McPackage, string>) => {
      return <StyledMonospace>{props.data?.location}</StyledMonospace>;
    },
    enableRowGroup: true,
    minWidth: 150,
  },
  {
    headerName: 'Comm Pkg',
    colId: 'CommPkg',
    headerTooltip: 'Commissioning Package Number',
    valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
    valueFormatter: (pkg) => pkg.data?.commissioningPackageUrl ?? '',
    cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
      if (!props.valueFormatted) {
        return props.value;
      }
      return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
    },
    minWidth: 185,
  },
  {
    headerName: 'System',
    colId: 'System',
    headerTooltip: 'System',
    valueGetter: (pkg) => pkg.data?.system,
    cellRenderer: (props: ICellRendererProps<McPackage, string>) => {
      return <StyledMonospace>{props.data?.system}</StyledMonospace>;
    },
    enableRowGroup: true,
    minWidth: 125,
  },
  {
    headerName: 'Actual M-01 Actual Date',
    colId: 'PlannedM1FinalPunch',
    headerTooltip: 'finalPunchPlannedDate',
    valueGetter: (pkg) => pkg.data?.finalPunchPlannedDate,
    cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
      return <YearAndWeekCell dateString={props.value!} />;
    },
    minWidth: 250,
  },
  {
    headerName: 'Actual M-02 RFC',
    colId: 'ActualM2ActualDate',
    headerTooltip: 'finalPunchActualDate',
    valueGetter: (pkg) => pkg.data?.finalPunchActualDate,
    cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
      return <YearAndWeekCell dateString={props.value!} />;
    },
    minWidth: 210,
  },
  {
    headerName: 'Actual M-03 RFC',
    colId: 'CommPri3',
    headerTooltip: 'rfC_ActualDate',
    valueGetter: (pkg) => pkg.data?.rfC_ActualDate,
    cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
      return <YearAndWeekCell dateString={props.value!} />;
    },
    minWidth: 200,
  },
  {
    headerName: 'Comm Pri1',
    colId: 'CommPri1',
    headerTooltip: 'Commissioning Priority 1',
    valueGetter: (pkg) => pkg.data?.priority1,
    enableRowGroup: true,
    minWidth: 155,
  },
  {
    headerName: 'Comm Pri2',
    colId: 'CommPri2',
    headerTooltip: 'Commissioning Priority 2',
    valueGetter: (pkg) => pkg.data?.priority2,
    enableRowGroup: true,
    minWidth: 155,
  },
  {
    headerName: 'Comm Pri3',
    colId: 'CommPri3',
    headerTooltip: 'Commissioning Priority 3',
    valueGetter: (pkg) => pkg.data?.priority3,
    enableRowGroup: true,
    minWidth: 155,
  },
];
