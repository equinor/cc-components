import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { Heattrace } from '@cc-components/heattraceshared';
import { HeattraceSidesheet } from '@cc-components/heattracesidesheet';

export const sidesheetConfig: SidesheetConfig<Heattrace> = {
  type: 'default',
  DetailsSidesheet: (props) => (
    <HeattraceSidesheet.Component
      id={props.id}
      item={props.item}
      close={props.controller.close}
    />
  ),
};
