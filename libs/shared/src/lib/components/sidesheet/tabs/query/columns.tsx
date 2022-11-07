import { proCoSysUrls } from '@cc-components/shared';
import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { DescriptionCell, LinkCell } from '../../../table';
import { QueryBase } from './types';

export const columns: ColDef<QueryBase>[] = [
  {
    field: 'Document No.',
    valueGetter: (pkg) => pkg.data?.queryNumber,
    valueFormatter: (pkg) =>
      pkg.data?.queryId ? proCoSysUrls.getDocumentUrl(pkg.data.queryId) : '',
    cellRenderer: (props: ICellRendererProps<QueryBase, string>) => {
      if (props.valueFormatted) {
        return <LinkCell url={props.valueFormatted} urlText={props.value} />;
      } else return null;
    },
  },
  {
    field: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<QueryBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
  },
  {
    field: 'Type',
    valueGetter: (pkg) => pkg.data?.type,
  },
  {
    field: 'Next to sign',
    valueGetter: (pkg) => pkg.data?.nextToSign,
  },
];
