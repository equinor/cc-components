import {
  DescriptionCell,
  LinkCell,
  StyledMonospace,
} from '@cc-components/shared/table-helpers';
import { SwcrPackage } from '@cc-components/swcrshared';
import { GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { getNextSignatureRoleKeys, getNextToSignKeys, getTypeKeys } from '../utils-keys';

export const tableConfig: GridConfig<SwcrPackage> = {
  // gridOptions: defaultGridOptions,
  columnDefinitions: [
    {
      field: 'SWCRs',
      headerName: 'SWCRs',
      valueGetter: (pkg) => pkg.data?.swcrNo,
      cellRenderer: (props: ICellRendererProps<SwcrPackage, string>) => {
        return <StyledMonospace>{props.data?.swcrNo}</StyledMonospace>;
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
      field: 'Title',
      headerTooltip: 'Title',
      valueGetter: (pkg) => pkg.data?.title,
      cellRenderer: (props: ICellRendererProps<SwcrPackage, string | undefined>) => {
        return <DescriptionCell description={props?.value} />;
      },
      width: 500,
    },
    {
      field: 'Contract',
      headerTooltip: 'Contract',
      valueGetter: (pkg) => pkg.data?.contract,
      width: 200,
    },
    {
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
      field: 'Status',
      headerTooltip: 'Status',
      valueGetter: (pkg) => pkg.data?.status,
      enableRowGroup: true,
      width: 200,
    },
    {
      field: 'Next sign by',
      headerTooltip: 'Next Sign by ',
      valueGetter: (pkg) => pkg.data?.nextToSign,
      cellRenderer: (props: ICellRendererProps<SwcrPackage>) => {
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
      headerTooltip: 'Next Sign Role',
      valueGetter: (pkg) => pkg.data?.nextSignRanking,
      cellRenderer: (props: ICellRendererProps<SwcrPackage>) => {
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
      headerTooltip: 'Supplier',
      valueGetter: (pkg) => pkg.data?.supplier,
      width: 150,
    },
    {
      field: 'Types',
      headerTooltip: 'Types',
      valueGetter: (pkg) => pkg.data?.types,
      cellRenderer: (props: ICellRendererProps<SwcrPackage>) => {
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
      headerTooltip: 'Priority',
      valueGetter: (pkg) => pkg.data?.priority,
      enableRowGroup: true,
      width: 150,
    },
    {
      field: 'Control System',
      headerTooltip: 'Control System',
      valueGetter: (pkg) => pkg.data?.controlSystem,
      width: 200,
    },
    {
      field: 'Node',
      headerTooltip: 'Node',
      valueGetter: (pkg) => pkg.data?.node,
      cellRenderer: (props: ICellRendererProps<SwcrPackage, string>) => {
        return <StyledMonospace>{props.data?.node}</StyledMonospace>;
      },
      width: 150,
    },
  ],
};
