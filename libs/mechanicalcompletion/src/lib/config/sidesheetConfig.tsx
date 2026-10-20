import { McPackage } from '../shared';
import { McSideSheet } from '../sidesheet';
import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';

export const sidesheetConfig: SidesheetConfig<McPackage> = {
  type: 'default',
  DetailsSidesheet: McSideSheet,
};
