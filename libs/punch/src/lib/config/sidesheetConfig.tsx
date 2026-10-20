import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { PunchSidesheet } from '../sidesheet';
import { Punch } from '../shared';
export const sidesheetConfig: SidesheetConfig<Punch> = {
  type: 'default',
  DetailsSidesheet: PunchSidesheet,
};
