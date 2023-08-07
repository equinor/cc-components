import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { PunchSidesheet } from '@cc-components/punchsidesheet';
import { Punch } from '@cc-components/punchshared';
export const sidesheetConfig: SidesheetConfig<Punch> = {
  type: 'default',
  DetailsSidesheet: (props) => (
    <PunchSidesheet.Component id={props.id} item={props.item} close={props.close} />
  ),
};
