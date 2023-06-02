import {
  BaseStatus,
  StatusCircle,
  StyledMonospace,
  statusColorMap,
} from '@cc-components/shared';
import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { CheckList } from '@cc-components/pipingshared';

export const checklistColumns: ColDef<CheckList>[] = [
  {
    field: 'Tag',
    valueGetter: (pkg) => pkg.data?.tagNo,
    cellRenderer: (props: ICellRendererProps<CheckList>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  {
    field: 'Revision',
    valueGetter: (pkg) => pkg.data?.revision,
    cellRenderer: (props: ICellRendererProps<CheckList>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  {
    field: 'Formular type',
    valueGetter: (pkg) => pkg.data?.formularType,
    cellRenderer: (props: ICellRendererProps<CheckList>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  {
    field: 'Responsible',
    valueGetter: (pkg) => pkg.data?.responsible,
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
    cellRenderer: (props: ICellRendererProps<CheckList>) => {
      if (!props.data?.status) return null;
      return (
        <StatusCircle
          content={props.data.status}
          statusColor={statusColorMap[props.data.status as BaseStatus]}
        />
      );
    },
  },
];
