import { HandoverPackage } from '@cc-components/handovershared';
import { StyledMonospace, statusColorMap } from '@cc-components/shared';
import { DateCell, DescriptionCell, LinkCell, StatusCell } from '@cc-components/shared';
import { BaseStatus } from '@cc-components/shared';

import { ICellRendererProps } from '@equinor/workspace-ag-grid';
import { GridConfig } from '@equinor/workspace-fusion/grid';

export const tableConfig: GridConfig<HandoverPackage> = {
  // gridOptions: defaultGridOptions,
  columnDefinitions: [
    {
      field: 'Comm pkg',
      valueGetter: (pkg) => pkg.data?.commpkgNo,
      valueFormatter: (pkg) => pkg.data?.url ?? '',
      cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
        if (!props.valueFormatted) {
          return null;
        }
        return (
          <StyledMonospace>
            <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />{' '}
          </StyledMonospace>
        );
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
        if (props.node.group) return null;
        return (
          <StatusCell
            content={props.value}
            cellAttributeFn={() => ({
              style: { backgroundColor: statusColorMap[props.value] },
            })}
          />
        );
      },
      enableRowGroup: true,
      width: 150,
    },
    {
      field: 'Comm status',
      valueGetter: (pkg) => pkg.data?.commpkgStatus,
      cellRenderer: (props: ICellRendererProps<HandoverPackage, BaseStatus>) => {
        if (props.node.group) return null;
        return (
          <StatusCell
            content={props.value}
            cellAttributeFn={() => ({
              style: { backgroundColor: statusColorMap[props.value] },
            })}
          />
        );
      },
      enableRowGroup: true,
      width: 150,
    },
    {
      field: 'Responsible',
      valueGetter: (pkg) => pkg.data?.responsible,
      enableRowGroup: true,
      width: 150,
    },
    {
      field: 'Area',
      valueGetter: (pkg) => pkg.data?.area,
      cellRenderer: (props: ICellRendererProps<HandoverPackage, string>) => {
        return <StyledMonospace>{props.data?.area}</StyledMonospace>;
      },
      enableRowGroup: true,
      width: 135,
    },
    {
      field: 'System',
      valueGetter: (pkg) => pkg.data?.system,
      cellRenderer: (props: ICellRendererProps<HandoverPackage, string>) => {
        return <StyledMonospace>{props.data?.system}</StyledMonospace>;
      },
      enableRowGroup: true,
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
        if (props.node.group) return null;
        return <DateCell dateString={props.value} />;
      },
      width: 180,
    },
    {
      field: 'Forecast RFC',
      valueGetter: (pkg) => pkg.data?.forecastStartDate,
      cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
        if (props.node.group) return null;
        return <DateCell dateString={props.value} />;
      },
      width: 180,
    },
    {
      field: 'Planned RFO',
      valueGetter: (pkg) => pkg.data?.rfocPlannedDate,
      cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
        if (props.node.group) return null;
        return <DateCell dateString={props.value} />;
      },
      width: 180,
    },
    {
      field: 'Forecast RFC',
      valueGetter: (pkg) => pkg.data?.rfocForecastDate,
      cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
        if (props.node.group) return null;
        return <DateCell dateString={props.value} />;
      },
      width: 180,
    },
  ],
};
