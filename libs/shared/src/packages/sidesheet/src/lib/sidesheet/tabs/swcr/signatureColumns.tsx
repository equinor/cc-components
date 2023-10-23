import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { SwcrSignature } from './types';

export const signatureColumns: ColDef<SwcrSignature>[] = [
  {
    field: '#',
    valueGetter: (pkg) => pkg.data?.signatureRole,
  },
];
