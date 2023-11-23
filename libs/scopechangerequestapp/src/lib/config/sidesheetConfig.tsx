import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import {
  ScopechangerequestSidesheet,
  CreateScopeChangeSidesheet,
} from '@cc-components/scopechangerequestsidesheet';
import { ScopeChangeRequest } from '@cc-components/scopechangerequestshared';
export const sidesheetConfig: SidesheetConfig<ScopeChangeRequest> = {
  type: 'default',
  CreateSidesheet: CreateScopeChangeSidesheet,
  DetailsSidesheet: ScopechangerequestSidesheet,
};
