import { SwcrPackage } from '@cc-components/swcrshared';
import { SwcrSidesheet } from '@cc-components/swcrsidesheet';
import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
export const sidesheetConfig: SidesheetConfig<SwcrPackage> = {
  type: 'default',
  DetailsSidesheet: (props) => (
    <SwcrSidesheet.Component
      id={props.id}
      item={props.item}
      closeSidesheet={props.close}
    />
  ),
};
