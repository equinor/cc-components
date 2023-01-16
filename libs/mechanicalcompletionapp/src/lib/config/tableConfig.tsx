import { McPackage, McStatus } from '@cc-components/mechanicalcompletionshared';
import {
  DescriptionCell,
  LinkCell,
  proCoSysUrls,
  StatusCell,
  statusColorMap,
  YearAndWeekCell,
} from '@cc-components/shared';
import { GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';

export const tableConfig: GridConfig<McPackage> = {
  columnDefinitions: [
    {
      field: 'McpkgNo',
      valueGetter: (pkg) => pkg.data?.mcPkgNumber,
      valueFormatter: (pkg) =>
        pkg.data?.mcPkgId ? proCoSysUrls.getMcUrl(pkg.data.mcPkgId) : '',
      cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
        if (!props.valueFormatted) {
          return null;
        } else {
          return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
        }
      },
      width: 100,
    },
    {
      field: 'Description',
      valueGetter: (pkg) => pkg.data?.description,
      cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
        return <DescriptionCell description={props.value} />;
      },
      width: 300,
    },
    {
      field: 'Discipline',
      valueGetter: (pkg) => pkg.data?.discipline,
      width: 100,
    },
    {
      field: 'MC Status',
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
      width: 100,
    },
    {
      field: 'Responsible',
      valueGetter: (pkg) => pkg.data?.responsible,
      width: 150,
    },
    {
      field: 'Phase',
      valueGetter: (pkg) => pkg.data?.phase,
      width: 150,
    },
    {
      field: 'Area',
      valueGetter: (pkg) => pkg.data?.area,
      width: 150,
    },
    {
      field: 'Comm. package',
      valueGetter: (pkg) => pkg.data?.commPkgNumber,
      valueFormatter: (pkg) =>
        pkg.data?.commPkgId ? proCoSysUrls.getCommPkgUrl(pkg.data.commPkgId) : '',
      cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
        if (!props.valueFormatted) {
          return null;
        } else {
          return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
        }
      },
      width: 120,
    },
    {
      field: 'System',
      valueGetter: (pkg) => pkg.data?.system,
      width: 100,
    },
    {
      field: 'Planned M-01 Final Punch',
      valueGetter: (pkg) => pkg.data?.finalPunchPlannedDate,
      cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
        return <YearAndWeekCell dateString={props.value} />;
      },
      width: 200,
    },
    {
      field: 'Actual M-01 Actual Date',
      valueGetter: (pkg) => pkg.data?.finalPunchActualDate,
      cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
        return <YearAndWeekCell dateString={props.value} />;
      },
      width: 200,
    },
    {
      field: 'Planned M-03 RFC',
      valueGetter: (pkg) => pkg.data?.rfccPlannedDate,
      cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
        return <YearAndWeekCell dateString={props.value} />;
      },
      width: 150,
    },
    {
      field: 'Actual M-03 RFC',
      valueGetter: (pkg) => pkg.data?.rfccActualDate,
      cellRenderer: (props: ICellRendererProps<McPackage, string | null>) => {
        return <YearAndWeekCell dateString={props.value} />;
      },
      width: 150,
    },
    {
      field: 'Comm Pri1',
      valueGetter: (pkg) => pkg.data?.priority,
      width: 100,
    },
    {
      field: 'Comm Pri2',
      valueGetter: (pkg) => pkg.data?.priority2,
      width: 100,
    },
    {
      field: 'Comm Pri3',
      valueGetter: (pkg) => pkg.data?.priority3,
      width: 100,
    },
  ],
};
