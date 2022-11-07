import {
  DateCell,
  DescriptionCell,
  StatusCell,
  statusColorMap,
} from '@cc-components/shared';
import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { HandoverPackage } from '../types';
import { Status } from '../types/handoverPackage';

export const tableConfig: ColDef<HandoverPackage>[] = [
  {
    field: 'Commpkgno',
    valueGetter: (pkg) => pkg.data?.commpkgNo,
    width: 100,
  },
  {
    field: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 300,
  },
  {
    field: 'Disciplines',
    valueGetter: (pkg) => pkg.data?.mcDisciplineCodes.join(',').replace(/,/g, ', '),
    width: 150,
  },
  {
    field: 'MC status',
    valueGetter: (pkg) => pkg.data?.mcStatus,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, Status>) => {
      return (
        <StatusCell
          content={props.value}
          cellAttributeFn={() => ({
            style: { backgroundColor: statusColorMap[props.value] },
          })}
        />
      );
    },
    width: 120,
  },
  {
    field: 'Comm status',
    valueGetter: (pkg) => pkg.data?.commpkgStatus,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, Status>) => {
      return (
        <StatusCell
          content={props.value}
          cellAttributeFn={() => ({
            style: { backgroundColor: statusColorMap[props.value] },
          })}
        />
      );
    },
    width: 120,
  },
  {
    field: 'Responsible',
    valueGetter: (pkg) => pkg.data?.responsible,
    width: 120,
  },
  {
    field: 'Area',
    valueGetter: (pkg) => pkg.data?.area,
    width: 135,
  },
  {
    field: 'System',
    valueGetter: (pkg) => pkg.data?.system,
    width: 100,
  },
  {
    field: 'Priority 1',
    valueGetter: (pkg) => pkg.data?.priority1,
    width: 120,
  },
  {
    field: 'Priority 2',
    valueGetter: (pkg) => pkg.data?.priority2,
    width: 120,
  },
  {
    field: 'Priority 3',
    valueGetter: (pkg) => pkg.data?.priority3,
    width: 120,
  },
  {
    field: 'Planned RFC',
    valueGetter: (pkg) => pkg.data?.plannedStartDate,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      return <DateCell dateString={props.value} />;
    },
    width: 150,
  },
  {
    field: 'Forecast RFC',
    valueGetter: (pkg) => pkg.data?.forecastStartDate,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      return <DateCell dateString={props.value} />;
    },
    width: 150,
  },
  {
    field: 'Planned RFO',
    valueGetter: (pkg) => pkg.data?.rfocPlannedDate,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      return <DateCell dateString={props.value} />;
    },
    width: 150,
  },
  {
    field: 'Forecast RFC',
    valueGetter: (pkg) => pkg.data?.rfocForecastDate,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      return <DateCell dateString={props.value} />;
    },
    width: 150,
  },
];
