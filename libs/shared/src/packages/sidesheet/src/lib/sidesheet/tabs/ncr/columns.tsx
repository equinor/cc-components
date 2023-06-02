import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { NcrBase } from './types';
import { LinkCell, DescriptionCell } from '../../../../../../table-helpers';

export const columns: ColDef<NcrBase>[] = [
  {
    field: 'Document No.',
    valueGetter: (pkg) => pkg.data?.documentNumber,
    // valueFormatter: (pkg) =>
    //   pkg.data?.documentId ? proCoSysUrls.getDocumentUrl(pkg.data.documentId) : '',
    // cellRenderer: (props: ICellRendererProps<NcrBase, string>) => {
    //   if (props.valueFormatted) {
    //     return <LinkCell url={props.valueFormatted} urlText={props.value} />;
    //   } else return null;
    // },
  },
  {
    field: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<NcrBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    autoHeight: true,
    wrapText: true,
    width: 400,
  },
];
