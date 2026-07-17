import {
  DescriptionCell,
  LinkCell,
  StatusCell,
  StyledMonospace,
  YearAndWeekCell,
  statusColorMap,
} from '@cc-components/shared';
import { ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { FilterState } from '@equinor/workspace-fusion/filter';
import {
  ColDef,
  ColumnsToolPanelModule,
  CsvExportColumn,
  GridConfig,
  MenuModule,
} from '@equinor/workspace-fusion/grid';
import { McPackage, McStatus } from 'libs/mechanicalcompletionshared';

import { useHttpClient } from '@cc-components/shared';
import {
  GridColumnOption,
  defaultGridOptions,
  defaultModules,
  downloadCsv,
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
  }, columnDefinitions, 'cc.mechanicalcompletion.grid.columnState');

  async function fetchCsvExport(
    filterState: FilterState,
    columns: CsvExportColumn[],
    sort?: { colId: string; descending: boolean }
  ) {
    await downloadCsv(
      (url, init) => client.fetch(url, init),
      `/api/contexts/${contextId}/mechanical-completion/csv-export`,
      { filter: filterState, columns, orderBy: sort?.colId, descending: sort?.descending },
      'mechanicalcompletion-export.csv',
      contextId
    );
  }

  return {
    getRows: getRows,
    modules: defaultModules,
    columnDefinitions: colDefs as any,
    gridOptions: {
      ...defaultGridOptions,
      onFirstDataRendered: (e) => {
        e.api.autoSizeColumns(
          e.api.getAllDisplayedColumns().filter((s) => s.getColId() !== 'description')
        );
      },
    },
    csvExport: fetchCsvExport,
    storageKey: 'cc.mechanicalcompletion.grid.columnState',
  };
};

const columnDefinitions: ColDef<McPackage>[] = [
  {
    headerName: 'MC Pkg',
    colId: 'MechanicalCompletionPackageNo',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionPackageNo,
    valueFormatter: (pkg) => pkg.data?.mechanicalCompletionPackageUrl ?? '',
    cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
      if (!props.valueFormatted) {
        return props.value;
      }
      return (
        <LinkCell
          url={props.valueFormatted}
          urlText={props.value ?? ''}
          aiLinkLocation="mechanical-completion grid"
          aiLinktype="MCPkgNo"
        />
      );
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
    colId: 'MechanicalCompletionStatus',
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
    colId: 'MechanicalCompletionPhase',
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
    colId: 'CommissioningPackageNo',
    headerTooltip: 'Commissioning Package Number',
    valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
    valueFormatter: (pkg) => pkg.data?.commissioningPackageUrl ?? '',
    cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
      if (!props.valueFormatted) {
        return props.value;
      }
      return (
        <LinkCell
          url={props.valueFormatted}
          urlText={props.value ?? ''}
          aiLinkLocation="mechanical-completion grid"
          aiLinktype="CommPkgNo"
        />
      );
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
    colId: 'FinalPunchPlannedDate',
    headerTooltip: 'finalPunchPlannedDate',
    valueGetter: (pkg) => pkg.data?.finalPunchPlannedDate,
    cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
      return <YearAndWeekCell dateString={props.value!} />;
    },
    minWidth: 250,
  },
  {
    headerName: 'Actual M-02 RFC',
    colId: 'FinalPunchActualDate',
    headerTooltip: 'finalPunchActualDate',
    valueGetter: (pkg) => pkg.data?.finalPunchActualDate,
    cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
      return <YearAndWeekCell dateString={props.value!} />;
    },
    minWidth: 210,
  },
  {
    headerName: 'Actual M-03 RFC',
    colId: 'RFC_ActualDate',
    headerTooltip: 'rfC_ActualDate',
    valueGetter: (pkg) => pkg.data?.rfC_ActualDate,
    cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
      return <YearAndWeekCell dateString={props.value!} />;
    },
    minWidth: 200,
  },
  {
    headerName: 'Comm Pri1',
    colId: 'Priority1',
    headerTooltip: 'Commissioning Priority 1',
    valueGetter: (pkg) => pkg.data?.priority1,
    enableRowGroup: true,
    minWidth: 155,
  },
  {
    headerName: 'Comm Pri2',
    colId: 'Priority2',
    headerTooltip: 'Commissioning Priority 2',
    valueGetter: (pkg) => pkg.data?.priority2,
    enableRowGroup: true,
    minWidth: 155,
  },
  {
    headerName: 'Comm Pri3',
    colId: 'Priority3',
    headerTooltip: 'Commissioning Priority 3',
    valueGetter: (pkg) => pkg.data?.priority3,
    enableRowGroup: true,
    minWidth: 155,
  },
];
