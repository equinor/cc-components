import { ColDef, ICellRendererProps } from '@equinor/workspace-fusion/grid';

import { statusColorMap } from '../../../../../../mapping';
import { StatusCell } from '../../../../../../table-helpers';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { hasProperty } from '../../../../../../utils-typescript';
import { PunchBase } from './type';

export const columns: ColDef<PunchBase>[] = [
  {
    headerName: 'Punch No',
    valueGetter: (pkg) => pkg.data?.punchItemNo,
    cellRenderer: (props: ICellRendererProps<PunchBase, string | null>) => {
      return (
        <LinkCell
          url={props.data?.punchUrl ?? ''}
          urlText={props.value ?? ''}
          aiLinkLocation="shared punch sidesheet"
          aiLinktype="PunchNo"
        />
      );
    },
  },
  {
    headerName: 'Tag',
    valueGetter: (pkg) => pkg.data?.tagNo,
    cellRenderer: (props: ICellRendererProps<PunchBase, string | null>) => {
      return (
        <LinkCell
          url={props.data?.tagUrl}
          urlText={props.data?.tagNo}
          aiLinkLocation="shared punch sidesheet"
          aiLinktype="TagNo"
        />
      );
    },
  },
  {
    colId: 'description',
    headerName: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<PunchBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 250,
  },
  {
    headerName: 'To be cleared by',
    valueGetter: (pkg) => pkg.data?.clearedBy,
  },
  {
    headerName: 'Status',
    valueGetter: (pkg) => pkg.data?.category,
    cellRenderer: (props: ICellRendererProps<PunchBase, string | null>) => {
      return (
        <StatusCell
          content={props.value ?? null}
          cellAttributeFn={() => ({
            style: {
              backgroundColor: props.value
                ? hasProperty(statusColorMap, props.value)
                  ? statusColorMap[props.value]
                  : 'transparent'
                : 'transparent',
            },
          })}
        />
      );
    },
  },
  {
    headerName: 'Sorting',
    valueGetter: (pkg) => pkg.data?.sorting,
  },
];
