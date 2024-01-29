import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { InsulationTag } from '@cc-components/pipingshared';
import {
  BaseStatus,
  DescriptionCell,
  StatusCircle,
  StyledMonospace,
  statusColorMap,
} from '@cc-components/shared';

export const insulationsColumns: ColDef<InsulationTag>[] = [
  {
    headerName: 'Pipe insulations',
    valueGetter: (pkg) => pkg.data?.tagNo,
    cellRenderer: (props: ICellRendererProps<InsulationTag>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  {
    headerName: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<InsulationTag>) => {
      return <DescriptionCell description={props.value} />;
    },
  },
  {
    headerName: 'Checklist',
    valueGetter: (pkg) => pkg.data?.checklistStatus,
    cellRenderer: (props: ICellRendererProps<InsulationTag>) => {
      if (!props.data?.checklistStatus) return null;
      return (
        <StatusCircle
          content={props.data.checklistStatus}
          statusColor={statusColorMap[props.data.checklistStatus as BaseStatus]}
        />
      );
    },
  },
];
