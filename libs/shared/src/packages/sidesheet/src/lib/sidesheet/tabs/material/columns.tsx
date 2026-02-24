import { ColDef, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { AvailableItemCell } from './AvailableItemCell';
import { MaterialBase } from './types';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';

export const columns: ColDef<MaterialBase>[] = [
  {
    headerName: 'Available',
    valueGetter: (pkg) => pkg.data?.available,
    cellRenderer: (props: ICellRendererProps<MaterialBase, boolean | null>) => {
      return <AvailableItemCell available={props.value ?? null} />;
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
    headerName: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<MaterialBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
  },
  {
    headerName: 'QTY',
    valueGetter: (pkg) => pkg.data?.quantity,
  },
  {
    headerName: 'Info',
    valueGetter: (pkg) => pkg.data?.information,
  },
  {
    headerName: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
  },
  {
    headerName: 'Stock Location',
    valueGetter: (pkg) => pkg.data?.stockLocation,
    cellRenderer: (props: ICellRendererProps<MaterialBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
  },
];
