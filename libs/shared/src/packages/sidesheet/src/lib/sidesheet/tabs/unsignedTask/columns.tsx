import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { UnsignedTaskBase } from './types';
import { proCoSysUrls } from '../../../../../../mapping/src/lib/procosys/procosysUrls';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
//TODO: Fix url
export const columns: ColDef<UnsignedTaskBase>[] = [
  {
    field: '#',
    valueGetter: (pkg) => pkg.data?.taskNumber,
    // valueFormatter: (pkg) =>
    //   pkg.data?.taskId ? proCoSysUrls.getFormTypeUrl(pkg.data.taskId) : '',
    // cellRenderer: (props: ICellRendererProps<UnsignedTaskBase>) => {
    //   if (props.valueFormatted) {
    //     return <LinkCell url={props.valueFormatted} urlText={props.value} />;
    //   } else return null;
    // },
  },
  {
    field: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<UnsignedTaskBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    autoHeight: true,
    wrapText: true,
    width: 400,
  },
];
