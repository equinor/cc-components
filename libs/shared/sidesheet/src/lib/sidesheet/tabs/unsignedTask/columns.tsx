import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { proCoSysUrls } from '@cc-components/shared/mapping';
import { DescriptionCell, LinkCell } from '@cc-components/shared/table-helpers';
import { UnsignedTaskBase } from './types';
//TODO: Fix url
export const columns: ColDef<UnsignedTaskBase>[] = [
  {
    field: '#',
    valueGetter: (pkg) => pkg.data?.taskNo,
    valueFormatter: (pkg) =>
      pkg.data?.taskUrlId ? proCoSysUrls.getFormTypeUrl(pkg.data.taskUrlId) : '',
    cellRenderer: (props: ICellRendererProps<UnsignedTaskBase>) => {
      if (props.valueFormatted) {
        return <LinkCell url={props.valueFormatted} urlText={props.value} />;
      } else return null;
    },
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
