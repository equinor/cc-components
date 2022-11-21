import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { HandoverPackage } from '../types';
import { HandoverSidesheet } from '../ui-sidesheet/HandoverSidesheet';

export const sidesheetConfig: SidesheetConfig<HandoverPackage> = {
  Component: (props) => (
    <HandoverSidesheet.Component id={props.item.id} item={props.item} />
  ),
};
