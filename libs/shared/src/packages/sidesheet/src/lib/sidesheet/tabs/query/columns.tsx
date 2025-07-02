import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { QueryBase } from './types';

export const columns: ColDef<QueryBase>[] = [
  {
    headerName: 'Document No.',
    valueGetter: (pkg) => pkg.data?.queryNo,
    cellRenderer: (props: ICellRendererProps<QueryBase, string | null>) => {
      return (
        <LinkCell
          url={props.data?.queryUrl}
          urlText={props.data?.queryNo}
          aiLinkLocation="shared query sidesheet"
          aiLinktype="QueryNo"
        />
      );
    },
  },
  {
    colId: 'title',
    headerName: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<QueryBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 200,
  },
  {
    headerName: 'Status',
    valueGetter: (pkg) => pkg.data?.queryStatus,
  },
  {
    headerName: 'Type',
    valueGetter: (pkg) => pkg.data?.queryType,
  },
  {
    headerName: 'Next to sign',
    valueGetter: (pkg) => pkg.data?.nextToSign,
  },
];
