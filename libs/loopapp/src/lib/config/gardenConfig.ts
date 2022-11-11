import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { CustomGroupByKeys, ExtendedGardenFields, Loop } from '../types';
import { GardenItem } from '../ui-garden';
import { fieldSettings, getHighlightedColumn, getItemWidth } from '../utils-garden';

export const gardenConfig: GardenConfig<
  Loop,
  ExtendedGardenFields,
  CustomGroupByKeys,
  Record<string, unknown>
> = {
  getDisplayName: (item) => item.loopNo,
  initialGrouping: { horizontalGroupingAccessor: 'RFC', verticalGroupingKeys: [] },
  customGroupByKeys: {
    plannedForecast: 'Planned',
    weeklyDaily: 'Weekly',
  },
  fieldSettings: fieldSettings,
  visuals: {
    highlightHorizontalColumn: getHighlightedColumn,
    calculateItemWidth: getItemWidth,
  },
  customViews: {
    customItemView: GardenItem,
  },
};
