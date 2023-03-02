import { proCoSysUrls } from '@cc-components/shared/mapping';
import { DescriptionCell, LinkCell } from '@cc-components/shared/table-helpers';
import { SwcrPackage } from '@cc-components/swcrshared';
import { GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { getNextSignatureRoleKeys, getNextToSignKeys, getTypeKeys } from '../utils-keys';

export const tableConfig: GridConfig<SwcrPackage> = {
  columnDefinitions: [
    {
      field: 'SWCRs',
      headerName: 'SWCRs',
      valueGetter: (pkg) => pkg.data?.swcrNo,
      valueFormatter: (pkg) =>
        pkg.data?.swcrId ? proCoSysUrls.getSwcrUrl(pkg.data.swcrId) : '',
      cellRenderer: (props: ICellRendererProps<SwcrPackage, string | null>) => {
        if (!props.valueFormatted) {
          return null;
        }
        return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
      },
      width: 150,
    },
    {
      field: 'Title',
      valueGetter: (pkg) => pkg.data?.title,
      cellRenderer: (props: ICellRendererProps<SwcrPackage, string | undefined>) => {
        return <DescriptionCell description={props?.value} />;
      },
      width: 500,
    },
    {
      field: 'Contract',
      valueGetter: (pkg) => pkg.data?.contract,
      width: 200,
    },
    {
      field: 'System',
      valueGetter: (pkg) => pkg.data?.system,
      width: 150,
    },
    {
      field: 'Status',
      valueGetter: (pkg) => pkg.data?.status,
      width: 200,
    },
    {
      field: 'Next sign by',
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
      valueGetter: (pkg) => pkg.data?.nextSignRanking,
      cellRenderer: (props: ICellRendererProps<SwcrPackage>) => {
        if (!props.data) {
          return null;
        } else {
          const keys = getNextSignatureRoleKeys(props.data, '');
          return <div>{keys}</div>;
        }
      },
      width: 500,
    },
    {
      field: 'Supplier',
      valueGetter: (pkg) => pkg.data?.supplier,
      width: 350,
    },
    {
      field: 'Types',
      valueGetter: (pkg) => pkg.data?.types,
      cellRenderer: (props: ICellRendererProps<SwcrPackage>) => {
        if (!props.data) {
          return null;
        } else {
          const keys = getTypeKeys(props.data, '');
          return <div>{keys}</div>;
        }
      },
      width: 150,
    },
    {
      field: 'Priority',
      valueGetter: (pkg) => pkg.data?.priority,
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
      width: 150,
    },
  ],
};
