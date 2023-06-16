import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { UnsignedTaskBase } from './types';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';

export const columns: ColDef<UnsignedTaskBase>[] = [
  {
    field: '#',
    valueGetter: (pkg) => pkg.data?.taskNumber,
    cellRenderer: (props: ICellRendererProps<UnsignedTaskBase>) => {
      if (props.data) {
        return <LinkCell url={props.data.url} urlText={props.value} />;
      } else return null;
    },
  },
  {
    field: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<UnsignedTaskBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    autoHeight: true,
    wrapText: true,
    width: 400,
  },
];
