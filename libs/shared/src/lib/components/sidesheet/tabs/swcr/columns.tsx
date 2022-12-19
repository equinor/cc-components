import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { DescriptionCell, LinkCell } from '../../../table';
import { proCoSysUrls } from '../../../../mapping';
import { SwcrBase } from './types';

export const columns: ColDef<SwcrBase>[] = [
  {
    field: '#',
    valueGetter: (pkg) => pkg.data?.swcrNumber,
    valueFormatter: (pkg) => {
      if (pkg.data?.swcrId) {
        return proCoSysUrls.getSwcrUrl(pkg.data.swcrId);
      } else return '';
    },
    cellRenderer: (props: ICellRendererProps<SwcrBase>) => {
      if (props.valueFormatted) {
        return <LinkCell url={props.valueFormatted} urlText={props.value} />;
      } else return null;
    },
    width: 80,
  },
  {
    field: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<SwcrBase>) => (
      <DescriptionCell description={props.value} />
    ),
    width: 500,
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
    width: 150,
  },
  {
    field: 'Priority',
    valueGetter: (pkg) => pkg.data?.priority,
    width: 180,
  },
];
