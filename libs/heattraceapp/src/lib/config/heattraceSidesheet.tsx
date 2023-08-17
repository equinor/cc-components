import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { HeatTrace } from '@cc-components/heattraceshared';
import { HeattraceSidesheet } from '@cc-components/heattracesidesheet';

export const sidesheetConfig: SidesheetConfig<HeatTrace> = {
  type: 'default',
  DetailsSidesheet: (props) => (
    <HeattraceSidesheet.Component id={props.id} item={props.item} close={props.close} />
  ),
};
