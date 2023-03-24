import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { proCoSysUrls } from '@cc-components/shared/mapping';
import { DescriptionCell, LinkCell } from '@cc-components/shared/table-helpers';
import { UnsignedActionBase } from './types';
//TODO: Fix url
export const columns: ColDef<UnsignedActionBase>[] = [
  {
    field: '#',
    valueGetter: (pkg) => pkg.data?.actionNo,
    valueFormatter: (pkg) =>
      pkg.data?.actionUrlId ? proCoSysUrls.getFormTypeUrl(pkg.data.actionUrlId) : '',
    cellRenderer: (props: ICellRendererProps<UnsignedActionBase>) => {
      if (props.valueFormatted) {
        return <LinkCell url={props.valueFormatted} urlText={props.value} />;
      } else return null;
    },
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
