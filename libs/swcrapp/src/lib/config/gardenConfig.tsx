import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { ExtendedGardenFields, SwcrPackage } from '../types';
import { GardenGrouped, GardenHeader, GardenItem } from '../ui-garden';
import { customDescription } from '../utils-garden/customDescription';
import { fieldSettings } from '../utils-garden/fieldSettings';
import { getHighlighColumn } from '../utils-garden/getHighlightedColumn';
import { getItemWidth } from '../utils-garden/getItemWidth';

export const gardenConfig: GardenConfig<SwcrPackage, ExtendedGardenFields> = {
  getDisplayName: (pkg) => pkg.swcrNo,
  initialGrouping: { horizontalGroupingAccessor: 'dueAtDate', verticalGroupingKeys: [] },
  fieldSettings: fieldSettings,
  visuals: {
    calculateItemWidth: getItemWidth,
    rowHeight: 25,
    highlightHorizontalColumn: getHighlighColumn,
    getDescription: customDescription,
  },
  customViews: {
    customItemView: GardenItem,
    customHeaderView: GardenHeader,
    customGroupView: GardenGrouped,
  },
};
