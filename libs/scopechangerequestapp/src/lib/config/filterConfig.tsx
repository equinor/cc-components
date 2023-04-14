import { FilterConfig, FilterValueType } from '@equinor/workspace-fusion/filter';
import { ScopeChangeRequest, WorkflowStep } from '../types';
import {
  GuesstimateRanges,
  calculateGuesstimateHoursGap,
  guesstimate,
} from '../utils-filter/guesstimate';

export const filterConfig: FilterConfig<ScopeChangeRequest> = {
  filterGroups: [
    {
      name: 'Phase',
      valueFormatter: (scr) => scr.phase,
      defaultHidden: true,
    },
    {
      name: 'Category',
      valueFormatter: (scr) => scr.changeCategory.name,
      isQuickFilter: true,
    },
    {
      name: 'State',
      valueFormatter: (scr) => (scr.isVoided ? 'Voided' : scr.state),
      defaultUncheckedValues: ['Voided', 'Draft'],
      isQuickFilter: true,
    },
    {
      name: 'Next to sign',
      valueFormatter: (scr) =>
        scr.currentWorkflowStep?.criterias.find((x) => x.signedAtUtc === null)
          ?.valueDescription ?? null,
    },
    {
      name: 'Origin',
      valueFormatter: (scr) => scr.originSource,
    },
    {
      name: 'Step',
      valueFormatter: (scr) => scr.currentWorkflowStep?.name ?? null,
    },
    {
      name: 'Commissioning pack',
      valueFormatter: (scr) =>
        scr.commissioningPackages.map((commPkg) => commPkg.procosysNumber),
      isQuickFilter: true,
    },
    {
      name: 'Has Comments',
      valueFormatter: (scr) => booleanToHumanReadable(scr.hasComments),
      sort: (a) => a.sort(sortOnYesNo),
    },
    {
      name: 'Has contributors',
      valueFormatter: (scr) => booleanToHumanReadable(hasContributor(scr.workflowSteps)),
      sort: (a) => a.sort(sortOnYesNo),
    },
    {
      name: 'Pending contributors',
      valueFormatter: (scr) => booleanToHumanReadable(scr.hasPendingContributions),
      sort: (a) => a.sort(sortOnYesNo),
    },
    {
      name: 'Workflow status',
      valueFormatter: (scr) => scr.workflowStatus,
      isQuickFilter: true,
    },
    {
      name: 'Disciplines',
      valueFormatter: (scr) =>
        scr.disciplineGuesstimates.map(({ discipline }) => discipline.procosysCode),
      isQuickFilter: true,
    },
    {
      name: 'Has revisions',
      valueFormatter: (scr) => booleanToHumanReadable(scr.revisionNumber > 1),
      sort: (s) => s.sort(sortOnYesNo),
    },
    {
      name: 'Guesstimate',
      valueFormatter: (scr) =>
        scr.disciplineGuesstimates.length > 0
          ? calculateGuesstimateHoursGap(
              scr.disciplineGuesstimates.reduce(
                (count, curr) => curr.guesstimate + count,
                0
              )
            )
          : null,

      sort: (a) =>
        a.sort((a, b) => {
          if (typeof a !== 'string' || typeof b !== 'string') return 0;

          const aN = guesstimate.get(a as GuesstimateRanges);
          const bN = guesstimate.get(b as GuesstimateRanges);
          if (!aN || !bN) return 0;
          return aN - bN;
        }),
    },
    {
      name: 'Scope',
      valueFormatter: (scr) => scr.scope?.name ?? null,
    },
    {
      name: 'Potential warranty case',
      valueFormatter: (scr) => booleanToHumanReadable(scr.potentialWarrantyCase),
      sort: (a) => a.sort(sortOnYesNo),
    },
    {
      name: 'Potential ATS scope',
      valueFormatter: (scr) => booleanToHumanReadable(scr.potentialAtsScope),
      sort: (a) => a.sort(sortOnYesNo),
    },
  ],
};

function booleanToHumanReadable(val: boolean | undefined) {
  return val ? 'Yes' : 'No';
}

function sortOnYesNo(a: FilterValueType, b: FilterValueType) {
  return b === 'No' ? -1 : 1;
}

function hasContributor(workflowSteps: WorkflowStep[] | null) {
  if (workflowSteps?.length !== undefined) {
    for (let i = 0; i < workflowSteps?.length; i++) {
      if (workflowSteps[i].contributors.length > 0) return true;
    }
  }
  return false;
}
