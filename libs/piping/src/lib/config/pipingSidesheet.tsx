import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { Pipetest } from '../shared';
import { PipingSidesheet } from '../sidesheet';

export const sidesheetConfig: SidesheetConfig<Pipetest> = {
  type: 'default',
  DetailsSidesheet: PipingSidesheet,
};
