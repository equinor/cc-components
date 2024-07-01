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
import { domainNames } from '@cc-components/shared';

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
        e.api.autoSizeColumns(
          e.api
            .getAllDisplayedColumns()
            .filter((s) => !['description', 'title'].includes(s.getColId()))
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
    headerName: domainNames.softwareChangeRequests,
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
    colId: 'title',
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
    headerName: domainNames.contract,
    headerTooltip: domainNames.contract,
    valueGetter: (pkg) => pkg.data?.contract,
    width: 200,
  },
  {
    colId: 'System',
    headerName: domainNames.system,
    headerTooltip: domainNames.system,
    valueGetter: (pkg) => pkg.data?.system,
    cellRenderer: (props: ICellRendererProps<SwcrPackage, string>) => {
      return <StyledMonospace>{props.data?.system}</StyledMonospace>;
    },
    enableRowGroup: true,
    width: 150,
  },
  {
    colId: 'Status',
    headerName: domainNames.status,
    headerTooltip: domainNames.status,
    valueGetter: (pkg) => pkg.data?.status,
    enableRowGroup: true,
    width: 200,
  },
  // next sign by will be included with "Next sign role"
  {
    colId: 'NextSignBy',
    headerName: domainNames.nextSignBy, //denne heter functionalrole i FAM.
    headerTooltip: domainNames.nextSignBy,
    valueGetter: (pkg) => {
      const ranking = pkg.data?.nextToSignRanking ?? '';
      const role = pkg.data?.nextToSignFunctionalRole ?? '';
      return ranking || role ? `${ranking}: ${role}` : '';
    },
    width: 400,
  },
  {
    colId: 'NextSignRole',
    headerName: domainNames.nextToSignRole,
    headerTooltip: domainNames.nextToSignRole,
    valueGetter: (pkg) => {
      const ranking = pkg.data?.nextToSignRanking ?? '';
      const role = pkg.data?.nextToSignRole ?? '';
      return ranking || role ? `${ranking}: ${role}` : '';
    },
    enableRowGroup: true,
    minWidth: 200,
  },
  {
    colId: 'LatestSignBy',
    headerName: domainNames.lastSignedBy,
    headerTooltip: domainNames.lastSignedBy,
    valueGetter: (pkg) => {
      const ranking = pkg.data?.latestSignedRanking ?? '';
      const role = pkg.data?.latestSignedRoleFunctionalRole ?? '';
      return ranking || role ? `${ranking}: ${role}` : '';
    },
  },

  {
    colId: 'LatestSignByRole',
    headerName: domainNames.lastSignedByRole,
    headerTooltip: domainNames.lastSignedByRole,
    valueGetter: (pkg) => {
      const ranking = pkg.data?.latestSignedRanking ?? '';
      const role = pkg.data?.latestSignedRole ?? '';
      return ranking || role ? `${ranking}: ${role}` : '';
    },
    enableRowGroup: true,
    width: 300,
  },
  {
    colId: 'Supplier',
    headerName: domainNames.supplier,
    headerTooltip: domainNames.supplier,
    valueGetter: (pkg) => pkg.data?.supplier,
    width: 150,
  },
  {
    colId: 'Types',
    headerName: domainNames.types,
    headerTooltip: domainNames.types,
    valueGetter: (pkg) => pkg.data?.swcrTypes,
    enableRowGroup: true,
    width: 150,
  },
  {
    colId: 'Priority',
    headerName: domainNames.priority,
    headerTooltip: domainNames.priority,
    valueGetter: (pkg) => pkg.data?.priority,
    enableRowGroup: true,
    width: 150,
  },
  {
    colId: 'AutomationControlSystem',
    headerName: domainNames.automationControlSystem,
    headerTooltip: domainNames.automationControlSystem,
    valueGetter: (pkg) => pkg.data?.automationControlSystem,
    width: 200,
  },
  {
    colId: 'Node',
    headerName: domainNames.nodeIdentifier,
    headerTooltip: domainNames.nodeIdentifier,
    valueGetter: (pkg) => pkg.data?.nodeIdentifier,
    cellRenderer: (props: ICellRendererProps<SwcrPackage, string>) => {
      return <StyledMonospace>{props.data?.nodeIdentifier}</StyledMonospace>;
    },
    width: 150,
  },
];
