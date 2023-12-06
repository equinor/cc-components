import { WorkOrder } from '@cc-components/workordershared';
import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { WorkorderSidesheet } from '@cc-components/workordersidesheet';

export const sidesheetConfig: SidesheetConfig<WorkOrder> = {
  type: 'default',
  DetailsSidesheet: WorkorderSidesheet,
};
