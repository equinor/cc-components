import {
  DateCell,
  LinkCell,
  proCoSysUrls,
  StatusCell,
  statusColorMap,
} from '@cc-components/shared';
import { ICellRendererProps } from '@equinor/workspace-ag-grid';
import { GridConfig } from '@equinor/workspace-fusion';
import { Loop, Status } from '../types';

export const tableConfig = (): GridConfig<Loop> => {
  return {
    columnDefinitions: [
      {
        field: 'Loop tag',
        valueGetter: (pkg) => pkg.data?.loopNo,
        width: 200,
      },
      {
        field: 'Description',
        valueGetter: (pkg) => pkg.data?.description,
        width: 350,
      },
      {
        field: 'System',
        valueGetter: (pkg) => pkg.data?.system,
        width: 80,
      },
      {
        field: 'Comm pkg',
        valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
        valueFormatter: (pkg) =>
          pkg.data?.commissioningPackageId
            ? proCoSysUrls.getCommPkgUrl(pkg.data.commissioningPackageId)
            : '',
        cellRenderer: (props: ICellRendererProps<Loop, string>) => {
          if (props.valueFormatted) {
            return <LinkCell url={props.valueFormatted} urlText={props.value} />;
          } else {
            return null;
          }
        },
        width: 90,
      },
      {
        field: 'MC pkg',
        valueGetter: (pkg) => pkg.data?.mechanicalCompletionPackageNo,
        valueFormatter: (pkg) =>
          pkg.data?.mechanicalCompletionPackageId
            ? proCoSysUrls.getMcUrl(pkg.data.mechanicalCompletionPackageId)
            : '',
        cellRenderer: (props: ICellRendererProps<Loop, string>) => {
          if (props.valueFormatted) {
            return <LinkCell url={props.valueFormatted} urlText={props.value} />;
          } else {
            return null;
          }
        },
        width: 80,
      },
      {
        field: 'Priority',
        valueGetter: (pkg) => pkg.data?.priority1,
        width: 80,
      },
      {
        field: 'Planned/Forecast RFC',
        valueGetter: (pkg) => pkg.data?.rfC_Planned_Forecast_Date,
        cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
          return <DateCell dateString={props.value} />;
        },
        width: 160,
      },
      {
        field: 'Planned/Forecast RFO',
        valueGetter: (pkg) => pkg.data?.rfO_Planned_Forecast_Date,
        cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
          return <DateCell dateString={props.value} />;
        },
        width: 160,
      },
      {
        field: 'Checklist status',
        valueGetter: (pkg) => pkg.data?.status,
        cellRenderer: (props: ICellRendererProps<Loop, Status | null>) => {
          return (
            <StatusCell
              content={props.value}
              cellAttributeFn={() => ({
                style: {
                  backgroundColor: props.value
                    ? statusColorMap[props.value]
                    : 'transparent',
                },
              })}
            />
          );
        },
        width: 120,
      },
      {
        field: 'Responsible',
        valueGetter: (pkg) => pkg.data?.responsible,
        width: 100,
      },
      {
        field: 'Location',
        valueGetter: (pkg) => pkg.data?.location,
        width: 100,
      },
      {
        field: 'Form type',
        valueGetter: (pkg) => pkg.data?.formularType,
        width: 100,
      },
      {
        field: 'Signed',
        valueGetter: (pkg) => pkg.data?.signedDate,
        cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
          return <DateCell dateString={props.value} />;
        },
        width: 100,
      },
      {
        field: 'Verified',
        valueGetter: (pkg) => pkg.data?.verifiedDate,
        cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
          return <DateCell dateString={props.value} />;
        },
        width: 100,
      },
      {
        field: 'Content MC status',
        valueGetter: (pkg) => pkg.data?.loopContentStatus,
        cellRenderer: (props: ICellRendererProps<Loop, Status | null>) => {
          return (
            <StatusCell
              content={props.value}
              cellAttributeFn={() => ({
                style: {
                  backgroundColor: props.value
                    ? statusColorMap[props.value]
                    : 'transparent',
                },
              })}
            />
          );
        },
        width: 150,
      },
      {
        field: 'Planned MC complete',
        valueGetter: (pkg) => pkg.data?.woPlannedCompletionDate,
        cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
          return <DateCell dateString={props.value} />;
        },
        width: 150,
      },
      {
        field: 'Actual MC complete',
        valueGetter: (pkg) => pkg.data?.woActualCompletionDate,
        cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
          return <DateCell dateString={props.value} />;
        },
        width: 150,
      },
      {
        field: 'Rem mhrs',
        valueGetter: (pkg) => pkg.data?.remainingManHours,
        cellRenderer: (props: ICellRendererProps<Loop, number | null>) => {
          return <div></div>;
        },
      },
    ],
  };
};
