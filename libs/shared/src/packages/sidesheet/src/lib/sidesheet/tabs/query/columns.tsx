import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { QueryBase } from './types';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { proCoSysUrls } from '../../../../../../mapping/src/lib/procosys/procosysUrls';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';

export const columns: ColDef<QueryBase>[] = [
  {
    field: 'Document No.',
    valueGetter: (pkg) => pkg.data?.queryNo,
    // valueFormatter: (pkg) =>
    //   pkg.data?.queryId ? proCoSysUrls.getDocumentUrl(pkg.data.queryId) : '',
    // cellRenderer: (props: ICellRendererProps<QueryBase, string>) => {
    //   if (props.valueFormatted) {
    //     return <LinkCell url={props.valueFormatted} urlText={props.value} />;
    //   } else return null;
    // },
    minWidth: 200,
  },
  {
    field: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<QueryBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    minWidth: 200,
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.queryStatus,
  },
  {
    field: 'Type',
    valueGetter: (pkg) => pkg.data?.queryType,
    width: 100,
  },
  {
    field: 'Next to sign',
    valueGetter: (pkg) => pkg.data?.nextToSign,
  },
];
