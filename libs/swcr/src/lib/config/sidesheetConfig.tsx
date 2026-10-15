import { SwcrPackage } from '../shared';
import { SwcrSidesheet } from '../sidesheet';
import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
export const sidesheetConfig: SidesheetConfig<SwcrPackage> = {
  type: 'default',
  DetailsSidesheet: SwcrSidesheet,
};
