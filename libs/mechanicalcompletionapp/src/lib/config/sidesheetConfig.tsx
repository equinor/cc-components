import { McPackage } from '@cc-components/mechanicalcompletionshared';
import { McSideSheet } from '@cc-components/mechanicalcompletionsidesheet';
import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';

export const sidesheetConfig: SidesheetConfig<McPackage> = {
  type: 'default',
  DetailsSidesheet: McSideSheet,
};
