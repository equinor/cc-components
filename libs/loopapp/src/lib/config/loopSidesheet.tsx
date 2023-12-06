import { Loop } from '@cc-components/loopshared';
import { LoopSidesheet } from '@cc-components/loopsidesheet';
import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';

export const sidesheetConfig: SidesheetConfig<Loop> = {
  type: 'default',
  DetailsSidesheet: LoopSidesheet,
};
