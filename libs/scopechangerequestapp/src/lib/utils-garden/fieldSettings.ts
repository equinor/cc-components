import { FieldSettings } from '@equinor/workspace-fusion/garden';
import { ScopeChangeRequest } from '../types';
import { getDateKey } from './getDateKey';

const workflowStatusMap = new Map([
  ['Initiate', 1],
  ['Initiate request', 2],
  ['Initiated', 3],
  ['Review by coordinator', 4],
  ['Reviewed', 5],
  ['Approved', 6],
  ['MC Scoping Completed', 7],
  ['Completed', 8],
  ['Rejected', 9],
]);

export const fieldSettings: FieldSettings<ScopeChangeRequest> = {
  currentWorkflowStep: {
    label: 'Current step',
    getKey: (item) => item?.currentWorkflowStep?.name ?? '(Blank)',
  },
  workflowStatus: {
    label: 'Workflow status',
    getKey: (item) => item.workflowStatus,
    getColumnSort: (a, b) => {
      const aN = workflowStatusMap.get(a);
      const bN = workflowStatusMap.get(b);
      if (!aN || !bN) return 0;
      return aN - bN;
    },
  },
  state: {
    label: 'State',
    getKey: (item) => (item.isVoided ? 'Voided' : item.state),
  },
  changeCategory: {
    label: 'Change category',
    getKey: (item) => item.changeCategory.name,
  },
};
