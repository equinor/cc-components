import { GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { ScopeChangeRequest } from '../types/scopeChangeRequest';
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
import { defaultColDef } from '@cc-components/shared/table-helpers';

Icon.add({ group, comment_chat, check_circle_outlined, close_circle_outlined });

function findNextToSign(sc: ScopeChangeRequest) {
  return (
    sc.currentWorkflowStep?.criterias?.find((x) => x.signedAtUtc === null)
      ?.valueDescription ?? null
  );
}

export const tableConfig: GridConfig<ScopeChangeRequest> = {
  gridOptions: { defaultColDef: defaultColDef },
  columnDefinitions: [
    {
      field: 'Id',
      valueGetter: (pkg) => pkg.data?.serialNumber,
      width: 90,
    },
    {
      field: 'Title',
      valueGetter: (pkg) => pkg.data?.title,
      width: 250,
    },
    {
      field: 'Comment',
      valueGetter: (pkg) => pkg.data?.hasComments,
      cellRenderer: (
        props: ICellRendererProps<ScopeChangeRequest, string | null | undefined>
      ) => {
        if (props.value) {
          return <Comments hasComments={props.data?.hasComments} />;
        }
        return null;
      },
      width: 130,
    },
    {
      field: 'Contr.',
      valueGetter: (pkg) => pkg.data?.hasPendingContributions,
      cellRenderer: (
        props: ICellRendererProps<ScopeChangeRequest, string | null | undefined>
      ) => {
        if (props.value) {
          return (
            <PendingContributions hasPending={props.data?.hasPendingContributions} />
          );
        }
        return null;
      },
      width: 110,
    },
    // Hidden for now only one phase
    // {
    //   field: 'Phase',
    //   valueGetter: (pkg) => pkg.data?.phase,
    //   enableRowGroup: true,
    //   width: 60,
    // },
    {
      field: 'Workflow',
      valueGetter: (pkg) => pkg.data?.workflowSteps,
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
    {
      field: 'Current step',
      valueGetter: (pkg) => pkg.data?.currentWorkflowStep?.name,
      width: 180,
    },
    {
      field: 'Next',
      valueGetter: (pkg) => {
        return pkg.data && findNextToSign(pkg.data);
      },
      width: 220,
    },
    {
      field: 'Status',
      valueGetter: (pkg) => pkg.data?.workflowStatus,
      width: 120,
    },
    {
      field: 'State',
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
      valueGetter: (pkg) => pkg.data?.disciplineGuesstimates,
      valueFormatter: (pkg) =>
        pkg.data?.disciplineGuesstimates
          .reduce((s, a) => s + a.guesstimate, 0)
          .toString() ?? '',
      width: 150,
    },
    {
      field: 'Est Mhrs',
      valueGetter: (pkg) => pkg.data?.workOrdersTotalEstimatedManHours,
      width: 150,
    },
    {
      field: 'Exp Mhrs',
      valueGetter: (pkg) => pkg.data?.workOrdersTotalExpendedManHours,
      width: 150,
    },
    {
      field: 'Rem Mhrs',
      valueGetter: (pkg) => pkg.data?.workOrdersTotalRemainingManHours,
      width: 150,
    },
    {
      field: 'Change category',
      valueGetter: (pkg) => pkg.data?.changeCategory?.name,
      width: 180,
    },
    {
      field: 'Change origin',
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
      valueGetter: (pkg) => pkg.data?.scope?.name,
      width: 140,
    },
    {
      field: 'Last updated',
      valueGetter: (pkg) => pkg.data?.modifiedAtUtc,
      cellRenderer: (
        props: ICellRendererProps<ScopeChangeRequest, string | null | undefined>
      ) => {
        return props.value ? new Date(props.value).toLocaleDateString() : '';
      },
      width: 160,
    },
    {
      field: 'Created at',
      valueGetter: (pkg) => pkg.data?.createdAtUtc,
      cellRenderer: (
        props: ICellRendererProps<ScopeChangeRequest, string | null | undefined>
      ) => {
        return props.value ? new Date(props.value).toLocaleDateString() : '';
      },
      width: 140,
    },
    {
      field: 'Last signed',
      valueGetter: (pkg) => pkg.data && getLastSigned(pkg.data),
      cellRenderer: (
        props: ICellRendererProps<ScopeChangeRequest, string | null | undefined>
      ) => {
        return props.value ? new Date(props.value).toLocaleDateString() : '';
      },
      width: 150,
    },
  ],
};
