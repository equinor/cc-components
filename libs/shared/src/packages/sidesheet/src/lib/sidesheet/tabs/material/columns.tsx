import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { AvailableItemCell } from './AvailableItemCell';
import { MaterialBase } from './types';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';

export const columns: ColDef<MaterialBase>[] = [
  {
    valueGetter: (pkg) => pkg.data?.available,
    cellRenderer: (props: ICellRendererProps<MaterialBase, boolean | null>) => {
      return <AvailableItemCell available={props.value} />;
    },
    minWidth: 120,
  },
  {
    headerName: '#',
    minWidth: 90,
    valueGetter: (pkg) => pkg.data?.itemNumber,
    valueFormatter: (pkg) => pkg.data?.itemNumber ?? '',
  },
  {
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<MaterialBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
  },
  {
    valueGetter: (pkg) => pkg.data?.quantity,
  },
  {
    valueGetter: (pkg) => pkg.data?.information,
  },
  {
    valueGetter: (pkg) => pkg.data?.status,
  },
  {
    valueGetter: (pkg) => pkg.data?.stockLocation,
  },
];
