import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { UnsignedActionBase } from './types';

export const columns: ColDef<UnsignedActionBase>[] = [
  {
    headerName: '#',
    valueGetter: (pkg) => pkg.data?.actionNo,
    cellRenderer: (props: ICellRendererProps<UnsignedActionBase>) => {
      if (props.data) {
        return <LinkCell url={props.data.unsignedTaskUrl} urlText={props.value} />;
      } else return null;
    },
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<UnsignedActionBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    flex: 1,
    minWidth: 300,
  },
];
