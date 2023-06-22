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
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionPackageNo,
    cellRenderer: (props: ICellRendererProps<McBase, string | null>) => {
      return <LinkCell url={props.data?.mechanicalCompletionPackageUrl} urlText={props.data?.mechanicalCompletionPackageNo} />;
    },
    minWidth: 200,
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
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionStatus,
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'RFCC',
    valueGetter: (pkg) => pkg.data?.rfC_Status,
    cellRenderer: (props: ICellRendererProps<McBase, PackageStatus | undefined>) => (
      <StatusCell
        content={`${props.value}`}
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
    valueGetter: (pkg) => pkg.data?.rfO_Status,
    cellRenderer: (props: ICellRendererProps<McBase, PackageStatus | undefined>) => (
      <StatusCell
        content={`${props.value}`}
        cellAttributeFn={() => ({
          style: { backgroundColor: props.value ? colorMap[props.value] : 'transparent' },
        })}
      />
    ),
    minWidth: 100,
    flex: 1,
  },
];
