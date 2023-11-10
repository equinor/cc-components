import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { SwcrSignature} from '../types';
import {
  StyledMonospace,
} from '@cc-components/shared/table-helpers';
import { SwcrPackage } from '@cc-components/swcrshared';


export const signatureColumns: ColDef<SwcrSignature>[] = [
  {
    field: 'Signature Role',
    valueGetter: (pkg) => pkg.data?.signatureRole,
    cellRenderer: (props: ICellRendererProps<SwcrSignature, string>) => {
      return <StyledMonospace>{props.data?.signatureRole}</StyledMonospace>;
    },
    minWidth: 200,  
  },
  {
    field: 'Seq',
    valueGetter: (pkg) => pkg.data?.sequence,
    minWidth: 100, 
  },
  {
    field: 'By',
    valueGetter: (pkg) => pkg.data?.functionalRole,
    cellRenderer: (props: ICellRendererProps<SwcrSignature, string>) => {
      return <StyledMonospace>{props.data?.functionalRole}</StyledMonospace>;
    },
    minWidth: 200,
  },
];

