import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { SwcrBase } from './types';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';

export const columns: ColDef<SwcrBase>[] = [
  {
    field: '#',
    valueGetter: (pkg) => pkg.data?.softwareChangeRecordNo,
    cellRenderer: (props: ICellRendererProps<SwcrBase, string | null>) => {
      return <LinkCell url={props.data?.softwareChangeRecordUrl} urlText={props.data?.softwareChangeRecordNo} />;
    },
    minWidth: 80,
  },
  {
    field: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<SwcrBase>) => (
      <DescriptionCell description={props.value} />
    ),
    flex: 1,
    minWidth: 50,
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
    flex: 1,
    minWidth: 50,
  },
  {
    field: 'Priority',
    valueGetter: (pkg) => pkg.data?.priority,
    flex: 1,
    minWidth: 50,
  },
];
