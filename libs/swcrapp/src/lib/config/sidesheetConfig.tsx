import { SwcrPackage } from '@cc-components/swcrshared';
import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { SwcrSidesheet } from '@cc-components/swcrsidesheet';
export const sidesheetConfig: SidesheetConfig<SwcrPackage> = {
  type: 'default',
  DetailsSidesheet: (props) => (
    <SwcrSidesheet.Component
      close={props.controller.close}
      id={props.id}
      item={props.item}
    />
  ),
};
