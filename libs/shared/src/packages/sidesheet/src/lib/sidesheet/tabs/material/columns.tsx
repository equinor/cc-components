import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { AvailableItemCell } from './AvailableItemCell';
import { MaterialBase } from './types';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';

export const columns: ColDef<MaterialBase>[] = [
  {
    field: '',
    valueGetter: (pkg) => pkg.data?.available,
    cellRenderer: (props: ICellRendererProps<MaterialBase, string | null>) => {
      return <AvailableItemCell available={props.value} />;
    },
    width: 50,
  },
  {
    field: '#',
    valueGetter: (pkg) => pkg.data?.itemNumber,
  },
  {
    field: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<MaterialBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
  },
  {
    field: 'QTY',
    valueGetter: (pkg) => pkg.data?.quantity,
  },
  {
    field: 'Info',
    valueGetter: (pkg) => pkg.data?.information,
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
  },
  {
    field: 'Stock Location',
    valueGetter: (pkg) => pkg.data?.stockLocation,
  },
];
