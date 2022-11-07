import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { proCoSysUrls } from '../../../../mapping';
import { DescriptionCell, LinkCell } from '../../../table';
import { PunchBase } from './type';

export const columns: ColDef<PunchBase>[] = [
  {
    field: 'Tag',
    valueGetter: (pkg) => pkg.data?.tagNumber,
    valueFormatter: (pkg) =>
      pkg.data?.tagId ? proCoSysUrls.getPunchUrl(pkg.data.tagId) : '',
    cellRenderer: (props: ICellRendererProps<PunchBase, string>) => {
      if (props.valueFormatted) {
        return <LinkCell url={props.valueFormatted} urlText={props.value} />;
      } else return null;
    },
  },
  {
    field: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<PunchBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
  },
  {
    field: 'To be cleared by',
    valueGetter: (pkg) => pkg.data?.toBeClearedBy,
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
  },
  {
    field: 'Sorting',
    valueGetter: (pkg) => pkg.data?.sorting,
  },
];
