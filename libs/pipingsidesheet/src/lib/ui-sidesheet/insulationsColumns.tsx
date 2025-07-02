import { ColDef, ICellRendererProps } from '@equinor/workspace-fusion/grid';
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
    valueGetter: (element) => element.data?.tagNo,
    cellRenderer: (props: ICellRendererProps<InsulationTag>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  {
    headerName: 'Description',
    valueGetter: (element) => element.data?.description,
    cellRenderer: (props: ICellRendererProps<InsulationTag>) => {
      return <DescriptionCell description={props.value} />;
    },
  },
  {
    headerName: 'Checklist',
    valueGetter: (element) => element.data?.status,
    cellRenderer: (props: ICellRendererProps<InsulationTag>) => {
      if (!props.data?.status) return null;
      return (
        <StatusCircle
          content={props.data?.status}
          statusColor={statusColorMap[props.data.status as BaseStatus]}
        />
      );
    },
  },
];
