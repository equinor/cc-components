import {
  DescriptionCell,
  StyledMonospace,
  LinkCell,
} from '@cc-components/shared/table-helpers';
import {
  DataResponse,
  defaultGridOptions,
  useGridDataSource,
} from '@cc-components/shared/workspace-config';
import { useHttpClient } from '@cc-components/shared';
import { FilterState } from '@equinor/workspace-fusion/filter';
import {
  ColDef,
  ColumnsToolPanelModule,
  GridConfig,
  ICellRendererProps,
  MenuModule,
} from '@equinor/workspace-fusion/grid';
import { SwcrPackage } from '@cc-components/swcrshared';

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
    field: 'SWCRs',
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
    colId: 'Title',
    field: 'Title',
    headerTooltip: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<SwcrPackage, string | undefined>) => {
      return <DescriptionCell description={props?.value} />;
    },
    width: 500,
  },
  {
    colId: 'Contract',
    field: 'Contract',
    headerTooltip: 'Contract',
    valueGetter: (pkg) => pkg.data?.contract,
    width: 200,
  },
  {
    colId: 'System',
    field: 'System',
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
    field: 'Status',
    headerTooltip: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
    enableRowGroup: true,
    width: 200,
  },
  // next sign by will be included with "Next sign role"
  {
    field: 'Next sign by', //denne heter functionalrole i FAM.
    headerTooltip: 'Next Sign by ',
    valueGetter: (pkg) => 'Waiting on data',
    // cellRenderer: (props: ICellRendererProps<SwcrPackage>) => {
    //   if (!props.data) {
    //     return null;
    //   } else {
    //     const keys = getNextToSignKeys(props.data, '');
    //     return (
    //       <div
    //         style={{
    //           overflow: 'hidden',
    //           textOverflow: 'ellipsis',
    //           whiteSpace: 'nowrap',
    //         }}
    //       >
    //         {keys}
    //       </div>
    //     );
    //   }
    // },
    width: 400,
  },
  {
    field: 'LatestSignBy', //denne hete LatestSignedRoleFunctionalRole i FAM
    headerTooltip: 'Latest Sign By',
    valueGetter: (pkg) => 'Waiting on data',
  },

  {
    colId: 'NextSignRole',
    field: 'Next Sign Role',
    headerTooltip: 'Next Sign Role',
    valueGetter: (pkg) => {
      const ranking = pkg.data?.nextToSignRanking;
      const role = pkg.data?.nextToSign ?? '(blank)';
      return !ranking ? role : `${ranking}: ${role}`;
    },
    enableRowGroup: true,
    width: 300,
  },
  {
    colId: 'LatestSignByRole',
    field: 'Latest Signed By Role',
    headerTooltip: 'Latest Signed Role',
    valueGetter: (pkg) => {
      const ranking = pkg.data?.latestSignedRanking ?? '(blank)';
      const role = pkg.data?.latestSignedRole ?? '(blank)';
      return `${ranking}: ${role}`;
    },
    enableRowGroup: true,
    width: 300,
  },
  {
    colId: 'Supplier',
    field: 'Supplier',
    headerTooltip: 'Supplier',
    valueGetter: (pkg) => pkg.data?.supplier,
    width: 150,
  },
  {
    field: 'Types',
    headerTooltip: 'Types',
    valueGetter: (pkg) => 'Waiting on data',
    // cellRenderer: (props: ICellRendererProps<SwcrPackage>) => {
    //   if (!props.data) {
    //     return null;
    //   } else {
    //     const keys = getTypeKeys(props.data, '');
    //     return <div>{keys}</div>;
    //   }
    // },
    enableRowGroup: true,
    width: 150,
  },
  {
    colId: 'Priority',
    field: 'Priority',
    headerTooltip: 'Priority',
    valueGetter: (pkg) => pkg.data?.priority,
    enableRowGroup: true,
    width: 150,
  },
  {
    colId: 'AutomationControlSystem',
    field: 'Control System',
    headerTooltip: 'Control System',
    valueGetter: (pkg) => pkg.data?.automationControlSystem,
    width: 200,
  },
  {
    colId: 'Node',
    field: 'Node',
    headerTooltip: 'Node',
    valueGetter: (pkg) => pkg.data?.nodeIdentifier,
    cellRenderer: (props: ICellRendererProps<SwcrPackage, string>) => {
      return <StyledMonospace>{props.data?.nodeIdentifier}</StyledMonospace>;
    },
    width: 150,
  },
];
