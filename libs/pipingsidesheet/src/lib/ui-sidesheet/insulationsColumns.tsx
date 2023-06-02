import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { InsulationBox } from '@cc-components/pipingshared';
import {
  BaseStatus,
  DescriptionCell,
  StatusCircle,
  StyledMonospace,
  statusColorMap,
} from '@cc-components/shared';

export const insulationsColumns: ColDef<InsulationBox>[] = [
  {
    field: 'Pipe insulations',
    valueGetter: (pkg) => pkg.data?.objectNo,
    cellRenderer: (props: ICellRendererProps<InsulationBox>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  {
    field: 'Description',
    valueGetter: (pkg) => pkg.data?.objectName,
    cellRenderer: (props: ICellRendererProps<InsulationBox>) => {
      return <DescriptionCell description={props.value} />;
    },
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.objectStatus,
    cellRenderer: (props: ICellRendererProps<InsulationBox>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  {
    field: 'Status name',
    valueGetter: (pkg) => pkg.data?.objectStatusName,
  },
  {
    field: 'Checklist',
    valueGetter: (pkg) => pkg.data?.procosysStatus,
    cellRenderer: (props: ICellRendererProps<InsulationBox>) => {
      if (!props.data?.procosysStatus) return null;
      return (
        <StatusCircle
          content={props.data.procosysStatus}
          statusColor={statusColorMap[props.data.procosysStatus as BaseStatus]}
        />
      );
    },
  },
];
