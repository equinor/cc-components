import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { UnsignedTaskBase } from './types';

export const columns: ColDef<UnsignedTaskBase>[] = [
  {
    headerName: '#',
    valueGetter: (pkg) => pkg.data?.taskId,
    cellRenderer: (props: ICellRendererProps<UnsignedTaskBase, string | null>) => {
      return (
        <LinkCell
          url={props.data?.unsignedTaskUrl}
          urlText={props.data?.taskId}
          aiLinkLocation="shared unsigned-task sidesheet"
          aiLinktype="UnsignedTaskNo"
        />
      );
    },
  },
  {
    colId: 'title',
    headerName: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<UnsignedTaskBase>) => (
      <DescriptionCell description={props.value} />
    ),
    flex: 1,
  },
];
