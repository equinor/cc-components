import { HandoverPackage } from '@cc-components/handover/shared';
import { HandoverSidesheet } from '@cc-components/handover/sidesheet';
import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';

export const sidesheetConfig: SidesheetConfig<HandoverPackage> = {
  type: 'default',
  DetailsSidesheet: (props) => (
    <HandoverSidesheet.Component
      id={props.id}
      item={props.item}
      close={props.controller.close}
    />
  ),
};
