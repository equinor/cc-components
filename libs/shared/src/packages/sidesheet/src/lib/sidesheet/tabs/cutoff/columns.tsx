import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { CutoffBase } from './types';
import { DateCell, DescriptionCell, ProgressCell } from '../../../../../../table-helpers';

export const columns: ColDef<CutoffBase>[] = [
  {
    headerName: 'Cutoff',
    valueGetter: (pkg) => pkg.data?.cutoffWeek,
    valueFormatter: (pkg) =>
      pkg.data?.cutoffWeek
        ? `${pkg.data.cutoffWeek.slice(0, 4)}w${pkg.data.cutoffWeek.slice(4)}`
        : '',
  },
  {
    headerName: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<CutoffBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
  },
  {
    headerName: 'Milestone',
    valueGetter: (pkg) => pkg.data?.milestone,
  },
  {
    headerName: 'SubMilestone',
    valueGetter: (pkg) => pkg.data?.subMilestone,
  },
  {
    headerName: 'Comm.Pkg',
    valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
  },
  {
    headerName: 'Area',
    valueGetter: (pkg) => pkg.data?.location,
  },
  {
    headerName: 'HoldBy',
    valueGetter: (pkg) => pkg.data?.holdBy,
  },
  {
    headerName: 'StartupDate',
    valueGetter: (pkg) => pkg.data?.plannedStartupDate,
    cellRenderer: (props: ICellRendererProps<CutoffBase, string | null>) => (
      <DateCell dateString={props.data?.plannedStartupDate} />
    ),
  },
  {
    headerName: 'FinishDate',
    valueGetter: (pkg) => pkg.data?.plannedCompletionDate,
    cellRenderer: (props: ICellRendererProps<CutoffBase, string | null>) => (
      <DateCell dateString={props.data?.plannedCompletionDate} />
    ),
  },
  {
    headerName: 'Responsible',
    valueGetter: (pkg) => pkg.data?.responsible,
  },
  {
    headerName: 'Project progress',

    cellRenderer: (props: ICellRendererProps<CutoffBase, string | null>) => (
      <ProgressCell percentWidth={Math.round(props.data?.projectProgress ?? 0)} />
    ),
  },

  {
    headerName: 'Expended mhrs',
    valueGetter: (pkg) =>
      pkg.data?.expendedManHours ? Math.round(pkg.data?.expendedManHours) : '',
  },
  {
    headerName: 'Estimated mmhrs',
    valueGetter: (pkg) =>
      pkg.data?.estimatedManHours ? Math.round(pkg.data?.estimatedManHours) : '',
  },
  {
    headerName: 'Earned mhrs',
    valueGetter: (pkg) =>
      pkg.data?.earnedManHours ? Math.round(pkg.data?.earnedManHours) : '',
  },
  {
    headerName: 'Expended LW',
    valueGetter: (pkg) =>
      pkg.data?.expendedManHoursLastWeek
        ? Math.round(pkg.data?.expendedManHoursLastWeek)
        : '',
  },
  {
    headerName: 'Earned LW',
    valueGetter: (pkg) =>
      pkg.data?.earnedManHoursLastWeek
        ? Math.round(pkg.data?.earnedManHoursLastWeek)
        : '',
  },
];
