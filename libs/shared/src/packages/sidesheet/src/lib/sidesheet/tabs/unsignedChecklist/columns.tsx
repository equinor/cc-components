import { ColDef, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { UnsignedChecklistBase } from './types';

export const columns: ColDef<UnsignedChecklistBase>[] = [
  {
    colId: 'type',
    headerName: 'Type',
    valueGetter: (pkg) => pkg.data?.type,
    cellRenderer: (props: ICellRendererProps<UnsignedChecklistBase>) => {
      return (
        <LinkCell
          url={props.data?.checklistUrl}
          urlText={props.value}
          aiLinkLocation="shared unsigned-checklist sidesheet"
          aiLinktype="UnsignedChecklistType"
        />
      );
    },
    flex: 1,
  },
  {
    colId: 'group',
    headerName: 'Group',
    valueGetter: (pkg) => pkg.data?.group,
    cellRenderer: (props: ICellRendererProps<UnsignedChecklistBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    flex: 1,
  },
  {
    colId: 'discipline',
    headerName: 'Discipline',
    valueGetter: (pkg) => pkg.data?.discipline,
    cellRenderer: (props: ICellRendererProps<UnsignedChecklistBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    flex: 1,
  },
  {
    colId: 'responsible',
    headerName: 'Responsible',
    valueGetter: (pkg) => pkg.data?.responsible,
    cellRenderer: (props: ICellRendererProps<UnsignedChecklistBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    flex: 1,
  },
  {
    colId: '#',
    headerName: 'Tag',
    valueGetter: (pkg) => pkg.data?.tagNo,
    cellRenderer: (props: ICellRendererProps<UnsignedChecklistBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    flex: 1,
  },
];
