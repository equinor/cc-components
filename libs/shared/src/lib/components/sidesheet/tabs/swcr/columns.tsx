import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { DescriptionCell } from '../../../table';
import { SwcrBase } from './types';

export const columns: ColDef<SwcrBase>[] = [
  {
    field: '#',
    valueGetter: (pkg) => pkg.data?.swcrNumber,
    width: 80,
  },
  {
    field: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps) => (
      <DescriptionCell description={props.value} />
    ),
    width: 200,
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
    width: 100,
  },
  {
    field: 'Priority',
    valueGetter: (pkg) => pkg.data?.priority,
    width: 100,
  },
];
