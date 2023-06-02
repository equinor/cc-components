import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { UnsignedActionBase } from './types';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
//TODO: Fix url
export const columns: ColDef<UnsignedActionBase>[] = [
  {
    field: '#',
    valueGetter: (pkg) => pkg.data?.actionNumber,
    // valueFormatter: (pkg) =>
    //   pkg.data?.actionId ? proCoSysUrls.getFormTypeUrl(pkg.data.actionId) : '',
    // cellRenderer: (props: ICellRendererProps<UnsignedActionBase>) => {
    //   if (props.valueFormatted) {
    //     return <LinkCell url={props.valueFormatted} urlText={props.value} />;
    //   } else return null;
    // },
  },
  {
    field: 'Title',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<UnsignedActionBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    autoHeight: true,
    wrapText: true,
    width: 600,
  },
];
