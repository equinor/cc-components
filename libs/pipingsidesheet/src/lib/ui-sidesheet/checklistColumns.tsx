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
    valueGetter: (pkg) => pkg.data?.tagNo,
    cellRenderer: (props: ICellRendererProps<Checklist>) => {
      return <LinkCell url={"TODO"} urlText={props.value ?? ''} />
    },
  },
  {
    headerName: 'Revision',
    valueGetter: (pkg) => pkg.data?.revision,
  },
  {
    headerName: 'Formular type',
    valueGetter: (pkg) => pkg.data?.formularType,
    cellRenderer: (props: ICellRendererProps<Checklist>) => {
      return <LinkCell url={"TODO"} urlText={props.value ?? ''} />
    },
  },
  {
    headerName: 'Responsible',
    valueGetter: (pkg) => pkg.data?.responsible,
  },
  {
    headerName: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
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
