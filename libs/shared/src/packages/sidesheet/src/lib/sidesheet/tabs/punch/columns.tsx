import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

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
      return <LinkCell url={props.data?.punchUrl ?? ''} urlText={props.value ?? ''} />;
    },
    minWidth: 150,
  },
  {
    headerName: 'Tag',
    valueGetter: (pkg) => pkg.data?.tagNo,
    cellRenderer: (props: ICellRendererProps<PunchBase, string | null>) => {
      return <LinkCell url={props.data?.tagUrl} urlText={props.data?.tagNo} />;
    },
    minWidth: 150,
  },
  {
    headerName: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<PunchBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    minWidth: 200,
    flex: 2,
  },
  {
    headerName: 'To be cleared by',
    valueGetter: (pkg) => pkg.data?.clearedBy,
    width: 160,
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
    minWidth: 100,
    flex: 1,
  },
  {
    headerName: 'Sorting',
    valueGetter: (pkg) => pkg.data?.sorting,
    minWidth: 100,
    flex: 1,
  },
];
