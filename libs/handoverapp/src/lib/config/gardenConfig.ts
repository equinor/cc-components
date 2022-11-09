import { GardenConfig } from '@equinor/workspace-fusion';
import { HandoverPackage } from '../types';

export const gardenConfig: GardenConfig<HandoverPackage> = {
  initialGrouping: { horizontalGroupingAccessor: 'commpkgNo', verticalGroupingKeys: [] },
  nodeLabelCallback: (item) => item.commpkgNo,
};
