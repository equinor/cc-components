import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { QueryBase } from './types';

export const columns: ColDef<QueryBase>[] = [
  {
    valueGetter: (pkg) => pkg.data?.queryNo,
    cellRenderer: (props: ICellRendererProps<QueryBase, string | null>) => {
      return <LinkCell url={props.data?.queryUrl} urlText={props.data?.queryNo} />;
    },
    minWidth: 200,
  },
  {
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<QueryBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    minWidth: 200,
  },
  {
    valueGetter: (pkg) => pkg.data?.queryStatus,
  },
  {
    valueGetter: (pkg) => pkg.data?.queryType,
    width: 100,
  },
  {
    valueGetter: (pkg) => pkg.data?.nextToSign,
  },
];
