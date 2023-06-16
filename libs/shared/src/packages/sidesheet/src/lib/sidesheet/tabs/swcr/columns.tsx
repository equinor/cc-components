import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { SwcrBase } from './types';
import { proCoSysUrls } from '../../../../../../mapping/src/lib/procosys/procosysUrls';
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
    minWidth: 300,
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
    minWidth: 150,
  },
  {
    field: 'Priority',
    valueGetter: (pkg) => pkg.data?.priority,
    minWidth: 180,
  },
];
