import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { Punch } from '../types';
import { PunchSidesheet } from '@cc-components/punchsidesheet';
export const sidesheetConfig: SidesheetConfig<Punch> = {
  type: 'default',
  DetailsSidesheet: (props) => (
    <PunchSidesheet.Component
      id={props.id}
      item={props.item}
      close={props.controller.close}
    />
  ),
};
