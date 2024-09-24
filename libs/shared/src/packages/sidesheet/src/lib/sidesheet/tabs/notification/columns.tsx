import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { NotificationBase } from './types';

export const columns: ColDef<NotificationBase>[] = [
  {
    headerName: 'Document No.',
    valueGetter: (pkg) => pkg.data?.notificationNo,
  },
  {
    headerName: 'Type',
    valueGetter: (pkg) => pkg.data?.type,
  },
  {
    colId: 'title',
    headerName: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<NotificationBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 200,
  },
  {
    headerName: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
  },

  {
    headerName: 'Next to sign',
    valueGetter: (pkg) => pkg.data?.nextToSign,
  },
];
