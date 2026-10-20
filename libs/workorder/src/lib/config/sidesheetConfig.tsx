import { WorkOrder } from '../shared';
import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { WorkorderSidesheet } from '../sidesheet';

export const sidesheetConfig: SidesheetConfig<WorkOrder> = {
  type: 'default',
  DetailsSidesheet: WorkorderSidesheet,
};
