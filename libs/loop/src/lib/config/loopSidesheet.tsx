import { Loop } from '../shared';
import { LoopSidesheet } from '../sidesheet';
import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';

export const sidesheetConfig: SidesheetConfig<Loop> = {
  type: 'default',
  DetailsSidesheet: LoopSidesheet,
};
