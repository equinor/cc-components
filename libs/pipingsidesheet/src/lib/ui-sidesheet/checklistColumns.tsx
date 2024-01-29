import {
  BaseStatus,
  StatusCircle,
  StyledMonospace,
  statusColorMap,
  LinkCell
} from '@cc-components/shared';
import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { Checklist } from '@cc-components/pipingshared';

export const checklistColumns: ColDef<Checklist>[] = [
  {
    headerName: 'Tag No',
    valueGetter: (item) => item.data?.tagNo,
    cellRenderer: (props: ICellRendererProps<Checklist>) => {
      return <LinkCell url={props.data?.tagUrl ?? ''} urlText={props.value ?? ''} />
    },
  },
  {
    headerName: 'Revision',
    valueGetter: (item) => item.data?.revision,
  },
  {
    headerName: 'Formular type',
    valueGetter: (item) => item.data?.formularType,
    cellRenderer: (props: ICellRendererProps<Checklist>) => {
      return <LinkCell url={props.data?.checklistUrl ?? ''} urlText={props.value ?? ''} />
    },
  },
  {
    headerName: 'Responsible',
    valueGetter: (item) => item.data?.responsible,
  },
  {
    headerName: 'Status',
    valueGetter: (item) => item.data?.status,
    cellRenderer: (props: ICellRendererProps<Checklist>) => {
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
