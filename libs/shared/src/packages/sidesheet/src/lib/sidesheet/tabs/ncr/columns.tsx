import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { NcrBase } from './types';
import { LinkCell, DescriptionCell } from '../../../../../../table-helpers';

export const columns: ColDef<NcrBase>[] = [
  {
    field: 'Document No.',
    valueGetter: (pkg) => pkg.data?.documentNumber,
    cellRenderer: (props: ICellRendererProps<NcrBase, string>) => {
      if (props.data) {
        return <LinkCell url={props.data.url} urlText={props.value} />;
      } else return null;
    },
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<NcrBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    minWidth: 200,
    flex: 2,
  },
];
