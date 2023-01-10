import { WorkOrder } from '@cc-components/workordershared';
import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { WorkorderSidesheet } from '@cc-components/workordersidesheet';

export const sidesheetConfig: SidesheetConfig<WorkOrder> = {
  type: 'default',
  DetailsSidesheet: (props) => (
    <WorkorderSidesheet.Component
      id={props.id}
      item={props.item}
      closeSidesheet={props.controller.close}
    />
  ),
};
