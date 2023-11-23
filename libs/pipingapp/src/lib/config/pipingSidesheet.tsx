import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { Pipetest } from '@cc-components/pipingshared';
import { PipingSidesheet } from '@cc-components/pipingsidesheet';

export const sidesheetConfig: SidesheetConfig<Pipetest> = {
  type: 'default',
  DetailsSidesheet: PipingSidesheet,
};
