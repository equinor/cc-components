import { HandoverPackage } from '@cc-components/handovershared';
import { statusColorMap } from '@cc-components/shared/mapping';
import {
  DateCell,
  DescriptionCell,
  LinkCell,
  StatusCell,
} from '@cc-components/shared/table-helpers';
import { BaseStatus } from '@cc-components/shared/types';

import { ICellRendererProps } from '@equinor/workspace-ag-grid';
import { GridConfig } from '@equinor/workspace-fusion/grid';

export const tableConfig: GridConfig<HandoverPackage> = {
  columnDefinitions: [
    {
      field: 'Commpkgno',
      valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
      valueFormatter: (pkg) => pkg.data?.commissioningPackageUrlId ?? '',
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
    // {
    //   field: 'Disciplines',
    //   valueGetter: (pkg) => pkg.data?.mcDisciplineCodes.join(',').replace(/,/g, ', '),
    //   width: 150,
    // },
    {
      field: 'MC status',
      valueGetter: (pkg) => pkg.data?.mechanicalCompletionStatus,
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
      valueGetter: (pkg) => pkg.data?.commissioningPackageStatus,
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
      valueGetter: (pkg) => pkg.data?.location,
      enableRowGroup: true,
      width: 135,
    },
    {
      field: 'System',
      valueGetter: (pkg) => pkg.data?.system,
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
      valueGetter: (pkg) => pkg.data?.rfcPlannedDate,
      cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
        if (props.node.group) return null;
        return <DateCell dateString={props.value} />;
      },
      width: 180,
    },
    {
      field: 'Forecast RFC',
      valueGetter: (pkg) => pkg.data?.rfcForecastDate,
      cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
        if (props.node.group) return null;
        return <DateCell dateString={props.value} />;
      },
      width: 180,
    },
    {
      field: 'Planned RFO',
      valueGetter: (pkg) => pkg.data?.rfoPlannedDate,
      cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
        if (props.node.group) return null;
        return <DateCell dateString={props.value} />;
      },
      width: 180,
    },
    {
      field: 'Forecast RFC',
      valueGetter: (pkg) => pkg.data?.rfoForecastDate,
      cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
        if (props.node.group) return null;
        return <DateCell dateString={props.value} />;
      },
      width: 180,
    },
  ],
};
