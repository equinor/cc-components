import {
  BaseStatus,
  LinkCell,
  StatusCircle,
  statusColorMap,
} from '@cc-components/shared';
import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { HeatTraceChecklist } from '@cc-components/heattraceshared';

export const checklistColumns: ColDef<HeatTraceChecklist>[] = [
  {
    headerName: 'Tag No',
    valueGetter: (pkg) => pkg.data?.tagNo,
    cellRenderer: (props: ICellRendererProps<HeatTraceChecklist>) => {
      return (
        <LinkCell url={props.data?.heatTraceCableUrl ?? ''} urlText={props.value ?? ''} />
      );
    },
  },
  {
    headerName: 'Formular type',
    valueGetter: (pkg) => pkg.data?.formularType,
    cellRenderer: (props: ICellRendererProps<HeatTraceChecklist>) => {
      return (
        <LinkCell url={props.data?.checklistUrl ?? ''} urlText={props.value ?? ''} />
      );
    },
  },
  {
    headerName: 'Responsible',
    valueGetter: (pkg) => pkg.data?.formResponsible,
  },
  {
    headerName: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
    cellRenderer: (props: ICellRendererProps<HeatTraceChecklist>) => {
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
