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
    minWidth: 150,
  },
  {
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<CutoffBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
  },
  {
    valueGetter: (pkg) => pkg.data?.milestone,
  },
  {
    valueGetter: (pkg) => pkg.data?.subMilestone,
  },
  {
    valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
  },
  {
    valueGetter: (pkg) => pkg.data?.location,
  },
  {
    valueGetter: (pkg) => pkg.data?.holdBy,
  },
  {
    valueGetter: (pkg) => pkg.data?.plannedStartupDate,
    cellRenderer: (props: ICellRendererProps<CutoffBase, string | null>) => (
      <DateCell dateString={props.data?.plannedStartupDate} />
    ),
  },
  {
    valueGetter: (pkg) => pkg.data?.plannedCompletionDate,
    cellRenderer: (props: ICellRendererProps<CutoffBase, string | null>) => (
      <DateCell dateString={props.data?.plannedCompletionDate} />
    ),
  },
  {
    valueGetter: (pkg) => pkg.data?.responsible,
  },
  {
    cellRenderer: (props: ICellRendererProps<CutoffBase, string | null>) => (
      <ProgressCell percentWidth={Math.round(props.data?.projectProgress ?? 0)} />
    ),
  },

  {
    valueGetter: (pkg) =>
      pkg.data?.expendedManHours ? Math.round(pkg.data?.expendedManHours) : '',
  },
  {
    valueGetter: (pkg) =>
      pkg.data?.estimatedManHours ? Math.round(pkg.data?.estimatedManHours) : '',
  },
  {
    valueGetter: (pkg) =>
      pkg.data?.earnedManHours ? Math.round(pkg.data?.earnedManHours) : '',
  },
  {
    valueGetter: (pkg) =>
      pkg.data?.expendedManHoursLastWeek
        ? Math.round(pkg.data?.expendedManHoursLastWeek)
        : '',
  },
  {
    valueGetter: (pkg) =>
      pkg.data?.earnedManHoursLastWeek
        ? Math.round(pkg.data?.earnedManHoursLastWeek)
        : '',
  },
];
