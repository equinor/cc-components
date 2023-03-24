import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { proCoSysUrls } from '@cc-components/shared/mapping';
import { DescriptionCell, LinkCell } from '@cc-components/shared/table-helpers';
import { QueryBase } from './types';

export const columns: ColDef<QueryBase>[] = [
  {
    field: 'Document No.',
    valueGetter: (pkg) => pkg.data?.queryNumber,
    valueFormatter: (pkg) =>
      pkg.data?.queryUrlId ? proCoSysUrls.getDocumentUrl(pkg.data.queryUrlId) : '',
    cellRenderer: (props: ICellRendererProps<QueryBase, string>) => {
      if (props.valueFormatted) {
        return <LinkCell url={props.valueFormatted} urlText={props.value} />;
      } else return null;
    },
    width: 180,
  },
  {
    field: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<QueryBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 400,
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
  },
  {
    field: 'Type',
    valueGetter: (pkg) => pkg.data?.type,
    width: 100,
  },
  {
    field: 'Next to sign',
    valueGetter: (pkg) => pkg.data?.nextToSign,
  },
];
