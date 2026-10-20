import { HandoverPackage } from '../shared';
import { HandoverSidesheet } from '../sidesheet';
import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';

export const sidesheetConfig: SidesheetConfig<HandoverPackage> = {
  type: 'default',
  DetailsSidesheet: HandoverSidesheet,
};
