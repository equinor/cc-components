import { ColDef, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { SwcrAttachment } from '../types';
import { LinkCell, StyledMonospace } from '@cc-components/shared/table-helpers';

export const attachmentColumns: ColDef<SwcrAttachment>[] = [
  {
    headerName: 'Title',
    valueGetter: (pkg) => pkg.data?.uri,
    cellRenderer: (props: ICellRendererProps<SwcrAttachment, string>) => {
      return <LinkCell url={props.data?.uri} urlText={props.data?.title} />;
    },
    minWidth: 450,
  },
];
