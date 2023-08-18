import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { CutoffBase } from './types';
import { DateCell, DescriptionCell, ProgressCell } from '../../../../../../table-helpers';

export const columns: ColDef<CutoffBase>[] = [
  {
    field: 'Cutoff',
    headerName: 'Cutoff',
    valueGetter: (pkg) => pkg.data?.cutoffWeek,
    valueFormatter: (pkg) =>
      pkg.data?.cutoffWeek
        ? `${pkg.data.cutoffWeek.slice(0, 4)}w${pkg.data.cutoffWeek.slice(4)}`
        : '',
    minWidth: 150,
  },
  {
    field: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<CutoffBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
  },
  {
    field: 'Project',
    valueGetter: (pkg) => pkg.data?.project,
  },
  {
    field: 'Milestone',
    valueGetter: (pkg) => pkg.data?.milestone,
  },
  {
    field: 'SubMilestone',
    valueGetter: (pkg) => pkg.data?.subMilestone,
  },
  {
    field: 'Comm.Pkg',
    valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
  },
  {
    field: 'Area',
    valueGetter: (pkg) => pkg.data?.location,
  },
  {
    field: 'HoldBy',
    valueGetter: (pkg) => pkg.data?.holdBy,
  },
  {
    field: 'StartupDate',
    valueGetter: (pkg) => pkg.data?.plannedStartupDate,
    cellRenderer: (props: ICellRendererProps<CutoffBase, string | null>) => (
      <DateCell dateString={props.data?.plannedStartupDate} />
    ),
  },
  {
    field: 'FinishDate',
    valueGetter: (pkg) => pkg.data?.plannedCompletionDate,
    cellRenderer: (props: ICellRendererProps<CutoffBase, string | null>) => (
      <DateCell dateString={props.data?.plannedCompletionDate} />
    ),
  },
  {
    field: 'Responsible',
    valueGetter: (pkg) => pkg.data?.responsible,
  },
  {
    field: 'Project progress',

    cellRenderer: (props: ICellRendererProps<CutoffBase, string | null>) => (
      <ProgressCell percentWidth={Math.round(props.data?.projectProgress ?? 0)} />
    ),
  },

  {
    field: 'Expended mhrs',
    valueGetter: (pkg) =>
      pkg.data?.expendedManHours ? Math.round(pkg.data?.expendedManHours) : '',
  },
  {
    field: 'Estimated mmhrs',
    valueGetter: (pkg) =>
      pkg.data?.estimatedManHours ? Math.round(pkg.data?.estimatedManHours) : '',
  },
  {
    field: 'Earned mhrs',
    valueGetter: (pkg) =>
      pkg.data?.earnedManHours ? Math.round(pkg.data?.earnedManHours) : '',
  },
  {
    field: 'Expended LW',
    valueGetter: (pkg) =>
      pkg.data?.expendedManHoursLastWeek
        ? Math.round(pkg.data?.expendedManHoursLastWeek)
        : '',
  },
  {
    field: 'Earned LW',
    valueGetter: (pkg) =>
      pkg.data?.earnedManHoursLastWeek
        ? Math.round(pkg.data?.earnedManHoursLastWeek)
        : '',
  },
];
