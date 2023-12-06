import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { PunchSidesheet } from '@cc-components/punchsidesheet';
import { Punch } from '@cc-components/punchshared';
export const sidesheetConfig: SidesheetConfig<Punch> = {
  type: 'default',
  DetailsSidesheet: PunchSidesheet,
};
