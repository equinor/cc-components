import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { UnsignedActionBase } from './types';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';

export const columns: ColDef<UnsignedActionBase>[] = [
  {
    field: '#',
    valueGetter: (pkg) => pkg.data?.actionNumber,
    cellRenderer: (props: ICellRendererProps<UnsignedActionBase>) => {
      if (props.data) {
        return <LinkCell url={props.data.url} urlText={props.value} />;
      } else return null;
    },
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'Title',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<UnsignedActionBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    flex: 1,
    minWidth: 100,
  },
];
