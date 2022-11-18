import { DescriptionCell } from '@cc-components/shared';
import { GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { SwcrPackage } from '../types';
import { getNextSignatureRoleKeys, getNextToSignKeys, getTypeKeys } from '../utils-keys';

export const tableConfig: GridConfig<SwcrPackage> = {
  columnDefinitions: [
    {
      field: 'SWCRs',
      valueGetter: (pkg) => pkg.data?.swcrNo,
      width: 60,
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
      width: 100,
    },
    {
      field: 'System',
      valueGetter: (pkg) => pkg.data?.system,
      width: 80,
    },
    {
      field: 'Status',
      valueGetter: (pkg) => pkg.data?.status,
      width: 80,
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
      width: 500,
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
      width: 70,
    },
    {
      field: 'Priority',
      valueGetter: (pkg) => pkg.data?.priority,
      width: 150,
    },
    {
      field: 'Control System',
      valueGetter: (pkg) => pkg.data?.controlSystem,
      width: 150,
    },
    {
      field: 'Node',
      valueGetter: (pkg) => pkg.data?.node,
      width: 60,
    },
  ],
};
