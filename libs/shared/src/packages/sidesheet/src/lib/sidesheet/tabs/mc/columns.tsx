import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { McBase } from './types';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { colorMap } from '../../../../../../mapping';
import { StatusCell } from '../../../../../../table-helpers';
import { PackageStatus } from '../../../../../../types';
import { getRFCCStatus, getRFOCStatus } from '../../../../../../utils-statuses';

export const columns: ColDef<McBase>[] = [
  {
    field: 'MC.Pkg',
    valueGetter: (pkg) => pkg.data?.mcPkgNo,
    cellRenderer: (props: ICellRendererProps<McBase>) => {
      if (props.data) {
        return <LinkCell url={props.data.url} urlText={props.value} />;
      } else return null;
    },
    minWidth: 100,
    flex: 2,
  },
  {
    field: 'Title',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<McBase>) => (
      <DescriptionCell description={props.value} />
    ),
    minWidth: 100,
    flex: 2,
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.mcStatus,
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'RFCC',
    valueGetter: (pkg) => pkg.data && getRFCCStatus(pkg.data),
    cellRenderer: (props: ICellRendererProps<McBase, PackageStatus | undefined>) => (
      <StatusCell
        content={`${props.value}`.replace('RFCC', '')}
        cellAttributeFn={() => ({
          style: {
            backgroundColor: props.value ? colorMap[props.value] : 'transparent',
          },
        })}
      />
    ),
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'RFOC',
    valueGetter: (pkg) => pkg.data && getRFOCStatus(pkg.data),
    cellRenderer: (props: ICellRendererProps<McBase, PackageStatus | undefined>) => (
      <StatusCell
        content={`${props.value}`.replace('RFOC', '')}
        cellAttributeFn={() => ({
          style: { backgroundColor: props.value ? colorMap[props.value] : 'transparent' },
        })}
      />
    ),
    minWidth: 100,
    flex: 1,
  },
];
