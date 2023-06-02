import { SoftwareChangeRecord } from '@cc-components/swcrshared';
import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { SwcrSidesheet } from '@cc-components/swcrsidesheet';
export const sidesheetConfig: SidesheetConfig<SoftwareChangeRecord> = {
  type: 'default',
  DetailsSidesheet: (props) => (
    <SwcrSidesheet.Component
      close={props.controller.close}
      id={props.id}
      item={props.item}
    />
  ),
};
