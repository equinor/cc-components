import { HandoverPackage } from '@cc-components/handovershared';
import { HandoverSidesheet } from '@cc-components/handoversidesheet';
import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';

export const sidesheetConfig: SidesheetConfig<HandoverPackage> = {
  type: 'default',
  DetailsSidesheet: HandoverSidesheet,
};
