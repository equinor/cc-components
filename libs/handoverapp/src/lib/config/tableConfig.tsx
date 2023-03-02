import { HandoverPackage } from '@cc-components/handovershared';
import { statusColorMap } from '@cc-components/shared/mapping';
import {
  DateCell,
  DescriptionCell,
  LinkCell,
  proCoSysUrls,
  StatusCell,
} from '@cc-components/shared/table-helpers';
import { BaseStatus } from '@cc-components/shared/types';

import { ICellRendererProps } from '@equinor/workspace-ag-grid';
import { GridConfig } from '@equinor/workspace-fusion/grid';

export const tableConfig: GridConfig<HandoverPackage> = {
  columnDefinitions: [
    {
      field: 'Commpkgno',
      valueGetter: (pkg) => pkg.data?.commpkgNo,
      valueFormatter: (pkg) => pkg.data?.url ?? '',
      cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
        if (!props.valueFormatted) {
          return null;
        }
        return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
      },
      width: 150,
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
      cellRenderer: (props: ICellRendererProps<HandoverPackage, BaseStatus>) => {
        return (
          <StatusCell
            content={props.value}
            cellAttributeFn={() => ({
              style: { backgroundColor: statusColorMap[props.value] },
            })}
          />
        );
      },
      width: 150,
    },
    {
      field: 'Comm status',
      valueGetter: (pkg) => pkg.data?.commpkgStatus,
      cellRenderer: (props: ICellRendererProps<HandoverPackage, BaseStatus>) => {
        return (
          <StatusCell
            content={props.value}
            cellAttributeFn={() => ({
              style: { backgroundColor: statusColorMap[props.value] },
            })}
          />
        );
      },
      width: 150,
    },
    {
      field: 'Responsible',
      valueGetter: (pkg) => pkg.data?.responsible,
      width: 150,
    },
    {
      field: 'Area',
      valueGetter: (pkg) => pkg.data?.area,
      width: 135,
    },
    {
      field: 'System',
      valueGetter: (pkg) => pkg.data?.system,
      width: 150,
    },
    {
      field: 'Priority 1',
      valueGetter: (pkg) => pkg.data?.priority1,
      width: 150,
    },
    {
      field: 'Priority 2',
      valueGetter: (pkg) => pkg.data?.priority2,
      width: 150,
    },
    {
      field: 'Priority 3',
      valueGetter: (pkg) => pkg.data?.priority3,
      width: 150,
    },
    {
      field: 'Planned RFC',
      valueGetter: (pkg) => pkg.data?.plannedStartDate,
      cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
        return <DateCell dateString={props.value} />;
      },
      width: 180,
    },
    {
      field: 'Forecast RFC',
      valueGetter: (pkg) => pkg.data?.forecastStartDate,
      cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
        return <DateCell dateString={props.value} />;
      },
      width: 180,
    },
    {
      field: 'Planned RFO',
      valueGetter: (pkg) => pkg.data?.rfocPlannedDate,
      cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
        return <DateCell dateString={props.value} />;
      },
      width: 180,
    },
    {
      field: 'Forecast RFC',
      valueGetter: (pkg) => pkg.data?.rfocForecastDate,
      cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
        return <DateCell dateString={props.value} />;
      },
      width: 180,
    },
  ],
};
