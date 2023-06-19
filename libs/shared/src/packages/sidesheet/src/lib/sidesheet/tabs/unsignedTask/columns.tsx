import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { UnsignedTaskBase } from './types';
import { proCoSysUrls } from '../../../../../../mapping/src/lib/procosys/procosysUrls';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
//TODO: Fix url
export const columns: ColDef<UnsignedTaskBase>[] = [
  {
    field: '#',
    valueGetter: (pkg) => pkg.data?.taskId,
    cellRenderer: (props: ICellRendererProps<UnsignedTaskBase, string | null>) => {
      return (
        <LinkCell
          url={props.data?.unsignedTaskUrl}
          urlText={props.data?.taskId}
        />
      );
    },
    minWidth: 80,
  },
  {
    field: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<UnsignedTaskBase>) => (
      <DescriptionCell description={props.value} />
    ),
    minWidth: 300,
  },
];
