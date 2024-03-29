import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { colorMap } from '../../../../../../mapping';
import { DateCell, StatusCell } from '../../../../../../table-helpers';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { PackageStatus } from '../../../../../../types';
import { McBase } from './types';

export const columns: ColDef<McBase>[] = [
  {
    headerName: 'MC.Pkg',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionPackageNo,
    cellRenderer: (props: ICellRendererProps<McBase, string | null>) => {
      return (
        <LinkCell
          url={props.data?.mechanicalCompletionPackageUrl}
          urlText={props.data?.mechanicalCompletionPackageNo}
        />
      );
    },
    minWidth: 150,
  },
  {
    headerName: 'Title',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<McBase>) => (
      <DescriptionCell description={props.value} />
    ),
    minWidth: 150,
    flex: 2,
  },
  {
    headerName: 'Status',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionStatus,
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
    headerName: 'Punch Accepted Date',
    valueGetter: (pkg) => pkg.data?.punchAcceptedActualtDate,
    cellRenderer: (props: ICellRendererProps<McBase>) => (
      <DateCell dateString={props.value} />
    ),
    minWidth: 175,
    flex: 2,
  },
  {
    headerName: 'RFCC',
    valueGetter: (pkg) => pkg.data?.rfcStatus,
    cellRenderer: (props: ICellRendererProps<McBase, PackageStatus | undefined>) => (
      <StatusCell
        content={`${props.value}`}
        cellAttributeFn={() => ({
          style: {
            backgroundColor:
              props.value && props.value != 'OS'
                ? colorMap[('RFC ' + props.value) as PackageStatus]
                : colorMap['OS'],
          },
        })}
      />
    ),
    minWidth: 100,
    flex: 1,
  },
  {
    headerName: 'RFOC',
    valueGetter: (pkg) => pkg.data?.rfoStatus,
    cellRenderer: (props: ICellRendererProps<McBase, PackageStatus | undefined>) => (
      <StatusCell
        content={`${props.value}`}
        cellAttributeFn={() => ({
          style: {
            backgroundColor:
              props.value && props.value != 'OS'
                ? colorMap[('RFO ' + props.value) as PackageStatus]
                : colorMap['OS'],
          },
        })}
      />
    ),
    minWidth: 100,
    flex: 1,
  },
];
