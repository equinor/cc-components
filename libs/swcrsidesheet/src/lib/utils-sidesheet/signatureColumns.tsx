import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { SwcrSignature } from '../types';

export const signatureColumns: ColDef<SwcrSignature>[] = [
  {
    field: 'Next Signature',
    valueGetter: (pkg) => pkg.data?.signatureRole,
  },
  {
    field: 'Seq',
    valueGetter: (pkg) => pkg.data?.sequence,
  },
  {
    field: 'By',
    valueGetter: (pkg) => pkg.data?.functionalRole,
  },
];
