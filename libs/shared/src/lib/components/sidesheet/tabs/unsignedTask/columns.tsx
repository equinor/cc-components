import { proCoSysUrls } from '@cc-components/shared';
import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { DescriptionCell, LinkCell } from '../../../table';
import { UnsignedTaskBase } from './types';
//TODO: Fix url
export const columns: ColDef<UnsignedTaskBase>[] = [
  {
    field: '#',
    valueGetter: (pkg) => pkg.data?.taskNumber,
    valueFormatter: (pkg) =>
      pkg.data?.taskId ? proCoSysUrls.getFormTypeUrl(pkg.data.taskId) : '',
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
      return <DescriptionCell description={props.value} />;
    },
  },
];
