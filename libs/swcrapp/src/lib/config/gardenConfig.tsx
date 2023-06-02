import { SoftwareChangeRecord } from '@cc-components/swcrshared';
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { ExtendedGardenFields } from '../types';
import { GardenGrouped, GardenHeader, GardenItem } from '../ui-garden';
import { customDescription } from '../utils-garden/customDescription';

export const gardenConfig: GardenConfig<SoftwareChangeRecord, ExtendedGardenFields> = {
  initialGrouping: { horizontalGroupingAccessor: 'dueAtDate', verticalGroupingKeys: [] },
  visuals: {
    rowHeight: 25,
    getDescription: customDescription,
  },
  customViews: {
    customItemView: GardenItem,
    customHeaderView: GardenHeader,
    customGroupView: GardenGrouped,
  },
} as any;
