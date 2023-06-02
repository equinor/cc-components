import { SoftwareChangeRecord } from '@cc-components/swcrshared';

import { DataResponse, useGridDataSource } from '@cc-components/shared/workspace-config';
import {
  DescriptionCell,
  LinkCell,
  StyledMonospace,
} from '@cc-components/shared/table-helpers';
import { defaultGridOptions } from '@cc-components/shared/workspace-config';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { ICellRendererProps } from '@equinor/workspace-ag-grid';
import { FilterStateGroup } from '@equinor/workspace-fusion/filter';
import { ColDef, GridConfig } from '@equinor/workspace-fusion/grid';
import { getNextSignatureRoleKeys, getNextToSignKeys, getTypeKeys } from '../utils-keys';

export const useTableConfig = (
  contextId: string
): GridConfig<SoftwareChangeRecord, FilterStateGroup[]> => {
  const client = useHttpClient('cc-api');
  const { getRows, colDefs } = useGridDataSource(async (req) => {
    const res = await client.fetch(`/api/contexts/${contextId}/swcr/grid`, req);
    const meta = (await res.json()) as DataResponse<SoftwareChangeRecord>;
    return {
      rowCount: meta.rowCount,
      items: meta.items,
      columnDefinitions: meta.columnDefinitions,
    };
  }, columnDefinitions);

  return {
    columnDefinitions: colDefs as [
      ColDef<SoftwareChangeRecord>,
      ...ColDef<SoftwareChangeRecord>[]
    ],
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
    getRows: getRows,
  };
};

const columnDefinitions: ColDef<SoftwareChangeRecord>[] = [
  {
    field: 'SWCRs',
    colId: 'Swcr',
    headerName: 'SWCRs',
    valueGetter: (pkg) => pkg.data?.softwareChangeRecordNo,
    cellRenderer: (props: ICellRendererProps<SoftwareChangeRecord, string>) => {
      return <StyledMonospace>{props.data?.softwareChangeRecordNo}</StyledMonospace>;
    },
    // valueFormatter: (pkg) =>
    //   pkg.data?.swcrId ? proCoSysUrls.getSwcrUrl(pkg.data.swcrId) : '',
    // cellRenderer: (props: ICellRendererProps<SwcrPackage, string | null>) => {
    //   if (!props.valueFormatted) {
    //     return null;
    //   }
    //   return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
    // },
    width: 150,
  },
  {
    colId: 'Title',
    field: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (
      props: ICellRendererProps<SoftwareChangeRecord, string | undefined>
    ) => {
      return <DescriptionCell description={props?.value} />;
    },
    width: 500,
  },
  {
    colId: 'Contract',
    field: 'Contract',
    valueGetter: (pkg) => pkg.data?.contract,
    width: 200,
  },
  {
    colId: 'System',
    field: 'System',
    valueGetter: (pkg) => pkg.data?.functionalSystem,
    cellRenderer: (props: ICellRendererProps<SoftwareChangeRecord, string>) => {
      return <StyledMonospace>{props.data?.functionalSystem}</StyledMonospace>;
    },
    enableRowGroup: true,
    width: 150,
  },
  {
    colId: 'Status',
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
    enableRowGroup: true,
    width: 200,
  },
  {
    field: 'Next sign by',
    valueGetter: (pkg) => pkg.data?.nextToSign,
    cellRenderer: (props: ICellRendererProps<SoftwareChangeRecord>) => {
      if (!props.data) {
        return null;
      } else {
        const keys = getNextToSignKeys(props.data, '');
        return (
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {keys}
          </div>
        );
      }
    },
    width: 400,
  },
  {
    field: 'Next sign role',
    valueGetter: (pkg) => pkg.data?.nextToSignRanking,
    cellRenderer: (props: ICellRendererProps<SoftwareChangeRecord>) => {
      if (!props.data) {
        return null;
      } else {
        const keys = getNextSignatureRoleKeys(props.data, '');
        return (
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {keys}
          </div>
        );
      }
    },
    width: 300,
  },
  {
    field: 'Supplier',
    valueGetter: (pkg) => pkg.data?.supplier,
    width: 150,
  },
  {
    field: 'Types',
    // valueGetter: (pkg) => pkg.data?.types,
    cellRenderer: (props: ICellRendererProps<SoftwareChangeRecord>) => {
      if (!props.data) {
        return null;
      } else {
        const keys = getTypeKeys(props.data, '');
        return <div>{keys}</div>;
      }
    },
    enableRowGroup: true,
    width: 150,
  },
  {
    field: 'Priority',
    valueGetter: (pkg) => pkg.data?.priority,
    enableRowGroup: true,
    width: 150,
  },
  {
    field: 'Control System',
    valueGetter: (pkg) => pkg.data?.controlSystem,
    width: 200,
  },
  {
    field: 'Node',
    valueGetter: (pkg) => pkg.data?.node,
    cellRenderer: (props: ICellRendererProps<SoftwareChangeRecord, string>) => {
      return <StyledMonospace>{props.data?.node}</StyledMonospace>;
    },
    width: 150,
  },
];
