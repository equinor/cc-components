import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { SwcrSignature} from '../types';
import {
  StyledMonospace,
} from '@cc-components/shared/table-helpers';
import { SwcrPackage } from '@cc-components/swcrshared';


export const signatureColumns: ColDef<SwcrSignature>[] = [
  {
    headerName: 'Signature Role',
    valueGetter: (pkg) => pkg.data?.signatureRole,
    cellRenderer: (props: ICellRendererProps<SwcrSignature, string>) => {
      return <StyledMonospace>{props.data?.signatureRole}</StyledMonospace>;
    },
    minWidth: 350,  
  },
  {
    headerName: 'Seq',
    valueGetter: (pkg) => pkg.data?.sequence,
    minWidth: 100, 
  },
  {
    headerName: 'By',
    valueGetter: (pkg) => pkg.data?.signedBy,
    cellRenderer: (props: ICellRendererProps<SwcrSignature, string>) => {
      return <StyledMonospace>{props.data?.signedBy}</StyledMonospace>;
    },
    minWidth: 450,
  },
  {
    headerName: 'Date',
    valueGetter: (pkg) => pkg.data?.signedDate,
    cellRenderer: (props: ICellRendererProps<SwcrSignature, string>) => {
      return <StyledMonospace>{props.data?.signedDate}</StyledMonospace>;
    },
    minWidth: 100,
  },
];

