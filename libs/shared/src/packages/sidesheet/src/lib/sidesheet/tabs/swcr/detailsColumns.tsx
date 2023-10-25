import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { SwcrBase } from './types';

export const columns: ColDef<SwcrBase>[] = [
  {
    field: '#',
    valueGetter: (pkg) => pkg.data?.softwareChangeRecordNo,
    cellRenderer: (props: ICellRendererProps<SwcrBase, string | null>) => {
      return (
        <LinkCell
          url={props.data?.softwareChangeRecordUrl}
          urlText={props.data?.softwareChangeRecordNo}
        />
      );
    },
    minWidth: 100,
  },
  {
    field: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<SwcrBase>) => (
      <DescriptionCell description={props.value} />
    ),
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'Priority',
    valueGetter: (pkg) => pkg.data?.priority,
    flex: 1,
    minWidth: 100,
  },
];
