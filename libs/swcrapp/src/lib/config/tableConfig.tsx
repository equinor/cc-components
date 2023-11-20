import { useHttpClient } from '@cc-components/shared';
import {
  DescriptionCell,
  LinkCell,
  StyledMonospace,
} from '@cc-components/shared/table-helpers';
import {
  DataResponse,
  defaultGridOptions,
  useGridDataSource,
} from '@cc-components/shared/workspace-config';
import { SwcrPackage } from '@cc-components/swcrshared';
import { FilterState } from '@equinor/workspace-fusion/filter';
import {
  ColDef,
  ColumnsToolPanelModule,
  GridConfig,
  ICellRendererProps,
  MenuModule,
} from '@equinor/workspace-fusion/grid';

export const useTableConfig = (
  contextId: string
): GridConfig<SwcrPackage, FilterState> => {
  const client = useHttpClient();

  const { getRows, colDefs } = useGridDataSource(async (req) => {
    const res = await client.fetch(`/api/contexts/${contextId}/SWCR/grid`, req);

    const meta = (await res.json()) as DataResponse<SwcrPackage>;
    return {
      rowCount: meta.rowCount,
      items: meta.items,
      columnDefinitions: meta.columnDefinitions,
    };
  }, columnDefinitions);

  return {
    getRows,
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
    columnDefinitions: colDefs as [ColDef<SwcrPackage>, ...ColDef<SwcrPackage>[]],
    modules: [MenuModule, ColumnsToolPanelModule],
  };
};

const columnDefinitions: ColDef<SwcrPackage>[] = [
  {
    colId: 'SwcrNo',
    headerName: 'Software Change Requests',
    valueGetter: (pkg) => pkg.data?.softwareChangeRecordNo,
    cellRenderer: (props: ICellRendererProps<SwcrPackage, string>) => {
      if (!props.data?.swcrUrl || !props.data?.softwareChangeRecordNo) {
        return null;
      }
      return (
        <LinkCell url={props.data.swcrUrl} urlText={props.data.softwareChangeRecordNo} />
      );
    },
    onCellClicked: () => {},
  },
  {
    headerName: 'Title',
    headerTooltip: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<SwcrPackage, string | undefined>) => {
      return <DescriptionCell description={props?.value} />;
    },
    width: 500,
  },
  {
    colId: 'Contract',
    headerName: 'Contract',
    headerTooltip: 'Contract',
    valueGetter: (pkg) => pkg.data?.contract,
    width: 200,
  },
  {
    colId: 'System',
    headerName: 'System',
    headerTooltip: 'System',
    valueGetter: (pkg) => pkg.data?.system,
    cellRenderer: (props: ICellRendererProps<SwcrPackage, string>) => {
      return <StyledMonospace>{props.data?.system}</StyledMonospace>;
    },
    enableRowGroup: true,
    width: 150,
  },
  {
    colId: 'Status',
    headerName: 'Status',
    headerTooltip: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
    enableRowGroup: true,
    width: 200,
  },
  // next sign by will be included with "Next sign role"
  {
    colId: 'NextSignBy',
    headerName: 'Next sign by', //denne heter functionalrole i FAM.
    headerTooltip: 'Next Sign by',
    valueGetter: (pkg) => {
      const ranking = pkg.data?.nextToSignRanking ?? '';
      const role = pkg.data?.nextToSignFunctionalRole ?? '';
      return (ranking || role) ? `${ranking}: ${role}` : '';
    },
    width: 400,
  },
  {
    colId: 'NextSignRole',
    headerName: 'Next Sign Role',
    headerTooltip: 'Next Sign Role',
    valueGetter: (pkg) => {
      const ranking = pkg.data?.nextToSignRanking ?? '';
      const role = pkg.data?.nextToSignRole ?? '';
      return (ranking || role) ? `${ranking}: ${role}` : '';
    },
    enableRowGroup: true,
    minWidth: 200,
  },
  {
    colId: 'LatestSignBy',
    headerName: 'Latest Sign By', 
    headerTooltip: 'Latest Sign By',
    valueGetter: (pkg) => {
      const ranking = pkg.data?.latestSignedRanking ?? '';
      const role = pkg.data?.latestSignedRoleFunctionalRole ?? '';
      return (ranking || role) ? `${ranking}: ${role}` : '';
    },
  },

  {
    colId: 'LatestSignByRole',
    headerName: 'Latest Signed By Role',
    headerTooltip: 'Latest Signed Role',
    valueGetter: (pkg) => {
      const ranking = pkg.data?.latestSignedRanking ?? '';
      const role = pkg.data?.latestSignedRole ?? '';
      return (ranking || role) ? `${ranking}: ${role}` : '';
    },
    enableRowGroup: true,
    width: 300,
  },
  {
    colId: 'Supplier',
    headerName: 'Supplier',
    headerTooltip: 'Supplier',
    valueGetter: (pkg) => pkg.data?.supplier,
    width: 150,
  },
  {
    colId: 'Types',
    headerName: 'Types',
    headerTooltip: 'Types',
    valueGetter: (pkg) => pkg.data?.swcrTypes,
    enableRowGroup: true,
    width: 150,
  },
  {
    colId: 'Priority',
    headerName: 'Priority',
    headerTooltip: 'Priority',
    valueGetter: (pkg) => pkg.data?.priority,
    enableRowGroup: true,
    width: 150,
  },
  {
    colId: 'AutomationControlSystem',
    headerName: 'Control System',
    headerTooltip: 'Control System',
    valueGetter: (pkg) => pkg.data?.automationControlSystem,
    width: 200,
  },
  {
    colId: 'Node',
    headerName: 'Node',
    headerTooltip: 'Node',
    valueGetter: (pkg) => pkg.data?.nodeIdentifier,
    cellRenderer: (props: ICellRendererProps<SwcrPackage, string>) => {
      return <StyledMonospace>{props.data?.nodeIdentifier}</StyledMonospace>;
    },
    width: 150,
  },
];
