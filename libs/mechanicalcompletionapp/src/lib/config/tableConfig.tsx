import { McPackage, McStatus } from '@cc-components/mechanicalcompletionshared';
import { statusColorMap } from '@cc-components/shared/mapping';
import {
  DescriptionCell,
  LinkCell,
  StatusCell,
  StyledMonospace,
  YearAndWeekCell,
} from '@cc-components/shared/table-helpers';

import { GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';

export const tableConfig: GridConfig<McPackage> = {
  // gridOptions: defaultGridOptions,
  columnDefinitions: [
    {
      headerName: 'MC Pkg',
      headerTooltip: 'Mechanical Completion Package Number',
      valueGetter: (pkg) => pkg.data?.mcPkgNumber,
      cellRenderer: (props: ICellRendererProps<McPackage, string>) => {
        return <StyledMonospace>{props.data?.mcPkgNumber}</StyledMonospace>;
      },
      // valueFormatter: (pkg) =>
      //   pkg.data?.mcPkgId ? proCoSysUrls.getMcUrl(pkg.data.mcPkgId) : '',
      // cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
      //   if (!props.valueFormatted) {
      //     return null;
      //   }
      //   return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
      // },
      width: 140,
    },
    {
      headerName: 'Description',
      headerTooltip: 'Description',
      valueGetter: (pkg) => pkg.data?.description,
      cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
        return <DescriptionCell description={props.value} />;
      },
      width: 300,
    },
    {
      headerName: 'Discipline',
      headerTooltip: 'Discipline',
      valueGetter: (pkg) => pkg.data?.discipline,
      enableRowGroup: true,
      width: 144,
    },
    {
      headerName: 'MC Status',
      headerTooltip: 'Mechanical Completion Status',
      valueGetter: (pkg) => pkg.data?.mcStatus,
      cellRenderer: (props: ICellRendererProps<McPackage, McStatus | null>) => {
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
      enableRowGroup: true,
      width: 150,
    },
    {
      headerName: 'Responsible',
      headerTooltip: 'Responsible',
      valueGetter: (pkg) => pkg.data?.responsible,
      enableRowGroup: true,
      width: 150,
    },
    {
      headerName: 'Phase',
      headerTooltip: 'Phase',
      valueGetter: (pkg) => pkg.data?.phase,
      enableRowGroup: true,
      width: 150,
    },
    {
      headerName: 'Area',
      headerTooltip: 'Area',
      valueGetter: (pkg) => pkg.data?.area,
      cellRenderer: (props: ICellRendererProps<McPackage, string>) => {
        return <StyledMonospace>{props.data?.area}</StyledMonospace>;
      },
      enableRowGroup: true,
      width: 150,
    },
    {
      headerName: 'Comm Pkg',
      headerTooltip: 'Commissioning Package Number',
      valueGetter: (pkg) => pkg.data?.commPkgNumber,
      cellRenderer: (props: ICellRendererProps<McPackage, string>) => {
        return <StyledMonospace>{props.data?.commPkgNumber}</StyledMonospace>;
      },
      // valueFormatter: (pkg) =>
      //   pkg.data?.commPkgId ? proCoSysUrls.getCommPkgUrl(pkg.data.commPkgId) : '',
      // cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
      //   if (!props.valueFormatted) {
      //     return null;
      //   } else {
      //     return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
      //   }
      // },
      width: 185,
    },
    {
      headerName: 'System',
      headerTooltip: 'System',
      valueGetter: (pkg) => pkg.data?.system,
      cellRenderer: (props: ICellRendererProps<McPackage, string>) => {
        return <StyledMonospace>{props.data?.system}</StyledMonospace>;
      },
      enableRowGroup: true,
      width: 125,
    },
    {
      headerName: 'Planned M-01 Final Punch',
      headerTooltip: 'Planned M-01 Final Punch',
      valueGetter: (pkg) => pkg.data?.finalPunchPlannedDate,
      cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
        return <YearAndWeekCell dateString={props.value} />;
      },
      width: 250,
    },
    {
      headerName: 'Actual M-01 Actual Date',
      headerTooltip: 'Actual M-01 Actual Date',
      valueGetter: (pkg) => pkg.data?.finalPunchActualDate,
      cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
        return <YearAndWeekCell dateString={props.value} />;
      },
      width: 250,
    },
    {
      headerName: 'Planned M-03 RFC',
      headerTooltip: 'Planned M-03 RFC',
      valueGetter: (pkg) => pkg.data?.rfccPlannedDate,
      cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
        return <YearAndWeekCell dateString={props.value} />;
      },
      width: 210,
    },
    {
      headerName: 'Actual M-03 RFC',
      headerTooltip: 'Actual M-03 RFC',
      valueGetter: (pkg) => pkg.data?.rfccActualDate,
      cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
        return <YearAndWeekCell dateString={props.value} />;
      },
      width: 200,
    },
    {
      headerName: 'Comm Pri1',
      headerTooltip: 'Commissioning Priority 1',
      valueGetter: (pkg) => pkg.data?.priority,
      enableRowGroup: true,
      width: 155,
    },
    {
      headerName: 'Comm Pri2',
      headerTooltip: 'Commissioning Priority 2',
      valueGetter: (pkg) => pkg.data?.priority2,
      enableRowGroup: true,
      width: 155,
    },
    {
      headerName: 'Comm Pri3',
      headerTooltip: 'Commissioning Priority 3',
      valueGetter: (pkg) => pkg.data?.priority3,
      enableRowGroup: true,
      width: 155,
    },
  ],
};
