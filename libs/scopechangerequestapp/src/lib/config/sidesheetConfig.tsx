import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { ScopechangerequestSidesheet } from '@cc-components/scopechangerequestsidesheet';
import { ScopeChangeRequest } from '@cc-components/scopechangerequestshared';
export const sidesheetConfig: SidesheetConfig<ScopeChangeRequest> = {
  type: 'default',
  DetailsSidesheet: (props) => (
    <ScopechangerequestSidesheet.Component
      id={props.id}
      //item={props.item}
      closeSidesheet={props.close}
    />
  ),
};
