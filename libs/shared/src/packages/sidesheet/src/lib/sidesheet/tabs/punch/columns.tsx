import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { PunchBase } from './type';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { statusColorMap } from '../../../../../../mapping';
import { StatusCell } from '../../../../../../table-helpers';
import { hasProperty } from '../../../../../../utils-typescript';

export const columns: ColDef<PunchBase>[] = [
  {
    field: 'Tag',
    valueGetter: (pkg) => pkg.data?.tagNumber,
    cellRenderer: (props: ICellRendererProps<PunchBase, string>) => {
      if (props.data) {
        return <LinkCell url={props.data.url} urlText={props.value} />;
      } else return null;
    },
    minWidth: 100,
    flex: 2,
  },
  {
    field: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<PunchBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    minWidth: 100,
    flex: 2,
  },
  {
    field: 'To be cleared by',
    valueGetter: (pkg) => pkg.data?.toBeClearedBy,
    minWidth: 50,
    flex: 1,
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
    cellRenderer: (props: ICellRendererProps<PunchBase, string | null>) => {
      return (
        <StatusCell
          content={props.value}
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
    minWidth: 50,
    flex: 1,
  },
  {
    field: 'Sorting',
    valueGetter: (pkg) => pkg.data?.sorting,
    minWidth: 50,
    flex: 1,
  },
];
