import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { WorkOrder } from '..';
import { GardenHeader, GardenItem } from '../ui-garden';
import { getItemWidth } from '../utils-garden';
import { fieldSettings } from '../utils-garden/fieldSettings';

export const gardenConfig: GardenConfig<WorkOrder> = {
  getDisplayName: (item) => item.workOrderNumber,
  initialGrouping: { horizontalGroupingAccessor: 'fwp', verticalGroupingKeys: [] },
  customViews: {
    customItemView: GardenItem,
    customHeaderView: GardenHeader,
  },
  visuals: {
    calculateItemWidth: getItemWidth,
  },
};
