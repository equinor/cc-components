import {
  ColDef,
  ColumnsToolPanelModule,
  GridConfig,
  ICellRendererProps,
  MenuModule,
} from '@equinor/workspace-fusion/grid';
import { Scope, ScopeChangeRequest } from '../types/scopeChangeRequest';
import { Comments } from '../utils-table/Comments';
import { PendingContributions } from '../utils-table/PendingContributions';
import { WorkflowCompact } from '../workflow/WorkflowCompact';
import { StateCell } from '../utils-table/StateCell';
import { getLastSigned } from '../utils-table/getLastSigned';
import {
  group,
  check_circle_outlined,
  comment_chat,
  close_circle_outlined,
} from '@equinor/eds-icons';
import { Icon } from '@equinor/eds-core-react';
import {
  GridColumnOption,
  defaultGridOptions,
  useGridDataSource,
} from '@cc-components/shared/workspace-config';
import { DateCell } from '@cc-components/shared/table-helpers';
import { FilterState } from '@equinor/workspace-fusion/filter';
import { useHttpClient } from '@cc-components/shared';

Icon.add({ group, comment_chat, check_circle_outlined, close_circle_outlined });

// function findNextToSign(sc: ScopeChangeRequest) {
//   return (
//     sc.currentWorkflowStep?.criterias?.find((x) => x.signedAtUtc === null)
//       ?.valueDescription ?? null
//   );
// }

export const useTableConfig = (
  contextId: string
): GridConfig<ScopeChangeRequest, FilterState> => {
  const client = useHttpClient();

  const { getRows, colDefs } = useGridDataSource(async (req) => {
    const res = await client.fetch(`api/scope-change-requests/grid`, req);
    const meta = (await res.json()) as {
      items: any[];
      rowCount: number;
      columnDefinitions: GridColumnOption[];
    };
    return {
      rowCount: meta.rowCount,
      items: meta.items,
      columnDefinitions: meta.columnDefinitions,
    };
  }, columnDefinitions);

  return {
    getRows: getRows,
    modules: [MenuModule, ColumnsToolPanelModule],
    columnDefinitions: colDefs as any,
    gridOptions: {
      ...defaultGridOptions,
      onFirstDataRendered: (e) => {
        e.columnApi.autoSizeColumns(
          e.columnApi
            .getAllDisplayedColumns()
            .filter((s) => s.getColId() !== 'description')
        );
      },
    },
  };
};
const columnDefinitions: ColDef<ScopeChangeRequest>[] = [
  {
    field: 'Id',
    valueGetter: (pkg) => pkg.data?.serialNumber,
    headerTooltip: 'Id',
    width: 90,
  },
  {
    field: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    headerTooltip: 'Title',
    width: 250,
  },
  // {
  //   field: 'Comment',
  //   valueGetter: (pkg) => pkg.data?.hasComments,
  //   headerTooltip: 'Comment',
  //   cellRenderer: (
  //     props: ICellRendererProps<ScopeChangeRequest, string | null | undefined>
  //   ) => {
  //     if (props.value) {
  //       return <Comments hasComments={props.data?.hasComments} />;
  //     }
  //     return null;
  //   },
  //   width: 130,
  // },

  // Hidden for now only one phase
  // {
  //   field: 'Phase',
  //   valueGetter: (pkg) => pkg.data?.phase,
  //   enableRowGroup: true,
  //   width: 60,
  // },
  {
    field: 'Workflow',
    valueGetter: (pkg) => pkg.data?.workflowStatus,
    headerTooltip: 'Workflow',
    valueFormatter: (pkg) =>
      pkg.data?.workflowSteps?.map((step) => step.name).toString() ?? '',
    cellRenderer: (
      props: ICellRendererProps<ScopeChangeRequest, string | null | undefined>
    ) => {
      if (props.valueFormatted && props.value && props.data?.workflowSteps) {
        return <WorkflowCompact steps={props.data?.workflowSteps} />;
      }
      return null;
    },
    width: 130,
  },
  // {
  //   field: 'Current step',
  //   headerTooltip: 'Current step',
  //   valueGetter: (pkg) => pkg.data?.documents,
  //   width: 180,
  // },
  // {
  //   field: 'Next',
  //   headerTooltip: 'Next',
  //   valueGetter: (pkg) => {
  //     return pkg.data && findNextToSign(pkg.data);
  //   },
  //   width: 220,
  // },
  {
    field: 'Status',
    headerTooltip: 'Status',
    valueGetter: (pkg) => pkg.data?.workflowStatus,
    width: 120,
  },
  {
    field: 'State',
    headerTooltip: 'State',
    valueGetter: (pkg) => pkg.data?.isVoided,
    valueFormatter: (pkg) => (pkg.data?.isVoided ? 'Voided' : pkg.data?.state) ?? '',
    cellRenderer: (
      props: ICellRendererProps<ScopeChangeRequest, string | null | undefined>
    ) => {
      return props.data ? <StateCell item={props.data} value={props.value} /> : null;
    },
    width: 110,
  },
  {
    field: 'Disciplines',
    headerTooltip: 'Disciplines',
    valueGetter: (pkg) => pkg.data?.disciplineGuesstimates,
    valueFormatter: (pkg) =>
      pkg.data?.disciplineGuesstimates
        .map(({ discipline: { procosysCode } }) => procosysCode)
        .toString() ?? '',
    //   cellRenderer: (
    //     props: ICellRendererProps<ScopeChangeRequest, string | null | undefined>
    //   ) => {
    //     return props.valueFormatted ? props.valueFormatted : '';
    //   },
    width: 140,
  },
  {
    field: 'Guess Mhrs',
    headerTooltip: 'Guesstimate Manhours',
    valueGetter: (pkg) => pkg.data?.disciplineGuesstimates,
    valueFormatter: (pkg) =>
      pkg.data?.disciplineGuesstimates
        .reduce((s, a) => s + a.guesstimate, 0)
        .toString() ?? '',
    width: 150,
  },
  // {
  //   field: 'Est Mhrs',
  //   headerTooltip: 'Estimate Manhours',
  //   valueGetter: (pkg) => pkg.data?.workOrdersTotalEstimatedManHours,
  //   width: 150,
  // },
  // {
  //   field: 'Exp Mhrs',
  //   headerTooltip: 'Expanded Manhours',
  //   valueGetter: (pkg) => pkg.data?.workOrdersTotalExpendedManHours,
  //   width: 150,
  // },
  // {
  //   field: 'Rem Mhrs',
  //   headerTooltip: 'Remaining Manhours',
  //   valueGetter: (pkg) => pkg.data?.workOrdersTotalRemainingManHours,
  //   width: 150,
  // },
  {
    field: 'Change origin',
    headerTooltip: 'Change Origin',
    valueGetter: (pkg) => pkg.data?.originSourceId,
    valueFormatter: (pkg) =>
      `${pkg.data?.originSource} - ${pkg.data?.originSourceId}` ?? '',
    //   cellRenderer: (
    //     props: ICellRendererProps<ScopeChangeRequest, string | null | undefined>
    //   ) => {
    //     if (props.valueFormatted && props.value) {
    //       return <LinkCell url={props.valueFormatted} urlText={props.value} />;
    //     }
    //     return null;
    //   },
    width: 180,
  },
  {
    field: 'Scope',
    headerTooltip: 'Scope',
    valueGetter: (pkg) => pkg.data?.scope?.name,
    width: 140,
  },
  {
    field: 'Last updated',
    headerTooltip: 'Last Updated',
    valueGetter: (pkg) => pkg.data?.modifiedAtUtc,
    cellRenderer: (
      props: ICellRendererProps<ScopeChangeRequest, string | null | undefined>
    ) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
    width: 160,
  },
  {
    field: 'Created at',
    headerTooltip: 'Created At',
    valueGetter: (pkg) => pkg.data?.createdAtUtc,
    cellRenderer: (
      props: ICellRendererProps<ScopeChangeRequest, string | null | undefined>
    ) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
    width: 140,
  },
  {
    field: 'Last signed',
    headerTooltip: 'Last Signed',
    valueGetter: (pkg) => pkg.data && getLastSigned(pkg.data),
    cellRenderer: (
      props: ICellRendererProps<ScopeChangeRequest, string | null | undefined>
    ) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
    width: 150,
  },
];
