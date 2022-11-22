import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { CustomGroupByKeys, ExtendedGardenFields, McPackage } from '../types';
import { GardenHeader, GardenItem } from '../ui-garden';
import { fieldSettings } from '../utils-garden/fieldSettings';
import { getHighlightedColumn } from '../utils-garden/getHighlightedColumn';
import { getItemWidth } from '../utils-garden/getItemWidth';

export const gardenConfig: GardenConfig<
  McPackage,
  ExtendedGardenFields,
  CustomGroupByKeys,
  Record<'averageTagVolume', number>
> = {
  getDisplayName: (item) => item.mcPkgNumber,
  customGroupByKeys: {
    plannedForecast: 'Planned',
    weeklyDaily: 'Weekly',
  },
  initialGrouping: { horizontalGroupingAccessor: 'rfcmc', verticalGroupingKeys: [] },
  fieldSettings: fieldSettings,
  customViews: {
    customItemView: GardenItem,
    customHeaderView: GardenHeader,
  },
  visuals: {
    calculateItemWidth: getItemWidth,
    highlightHorizontalColumn: getHighlightedColumn,
    rowHeight: 30,
  },
};
