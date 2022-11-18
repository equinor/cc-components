import { DateCell, DescriptionCell } from '@cc-components/shared';
import { GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { Punch } from '../types';
export const tableConfig: GridConfig<Punch> = {
  columnDefinitions: [
    {
      field: 'Punch',
      valueGetter: (pkg) => pkg.data?.punchItemNo,
      width: 100,
    },
    {
      field: 'Description',
      valueGetter: (pkg) => pkg.data?.description,
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        return <DescriptionCell description={props.value} />;
      },
      width: 300,
    },
    {
      field: 'Category',
      valueGetter: (pkg) => pkg.data?.punchItemCategory,
      width: 100,
    },
    {
      field: 'RFC Forecast/Planned',
      valueGetter: (pkg) => pkg.data?.c01ForecastDate ?? pkg.data?.c01PlannedDate,
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        return <DateCell dateString={props.value} />;
      },
      width: 150,
    },
    {
      field: 'RFO Forecast/Planned',
      valueGetter: (pkg) => pkg.data?.c07ForecastDate ?? pkg.data?.c07PlannedDate,
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        return <DateCell dateString={props.value} />;
      },
      width: 150,
    },
    {
      field: 'Formular type',
      valueGetter: (pkg) => pkg.data?.formularType,
      width: 100,
    },
    {
      field: 'Priority',
      valueGetter: (pkg) => pkg.data?.priority1,
      width: 100,
    },
    {
      field: 'PL Sorting',
      valueGetter: (pkg) => pkg.data?.punchListSorting,
      width: 100,
    },
    {
      field: 'PL Type',
      valueGetter: (pkg) => pkg.data?.punchListType,
      width: 100,
    },
    {
      field: 'Estimate',
      valueGetter: (pkg) => pkg.data?.estimate,
      width: 100,
    },
    {
      field: 'Raised by org',
      valueGetter: (pkg) => pkg.data?.raisedByOrganization,
      width: 150,
    },
    {
      field: 'Clearing by org',
      valueGetter: (pkg) => pkg.data?.clearingByOrganization,
      width: 150,
    },
  ],
};
