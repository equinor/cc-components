import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { HeatTrace } from '../shared';
import { HeattraceSidesheet } from '../sidesheet';

export const sidesheetConfig: SidesheetConfig<HeatTrace> = {
  type: 'default',
  DetailsSidesheet: HeattraceSidesheet,
};
