import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { SwcrBase } from './types';

export const columns: ColDef<SwcrBase>[] = [
  {
    headerName: '#',
    valueGetter: (pkg) => pkg.data?.softwareChangeRecordNo,
    cellRenderer: (props: ICellRendererProps<SwcrBase, string | null>) => {
      return (
        <LinkCell
          url={props.data?.softwareChangeRecordUrl}
          urlText={props.data?.softwareChangeRecordNo}
        />
      );
    },
  },
  {
    colId: 'description',
    headerName: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<SwcrBase>) => (
      <DescriptionCell description={props.value} />
    ),
    width: 250,
  },
  {
    headerName: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
  },
  {
    headerName: 'Priority',
    valueGetter: (pkg) => pkg.data?.priority,
  },
];
