import { McPackage } from '@cc-components/mechanicalcompletionshared';
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { CustomGroupByKeys, ExtendedGardenFields } from '../types';
import { GardenHeader, GardenItem, GardenGroupBy } from '../ui-garden';
import { fieldSettings } from '../utils-garden/fieldSettings';
import { getHighlightedColumn } from '../utils-garden/getHighlightedColumn';
import { getItemWidth } from '../utils-garden/getItemWidth';

export const gardenConfig: GardenConfig<
  McPackage,
  ExtendedGardenFields,
  CustomGroupByKeys,
  Record<'averageTagVolume', number>
> = {
  getDisplayName: (item) => item.mechanicalCompletionPackageNo,
  customGroupByKeys: {
    plannedForecast: 'Planned',
    weeklyDaily: 'Weekly',
  },
  initialGrouping: { horizontalGroupingAccessor: 'rfcmc', verticalGroupingKeys: [] },
  fieldSettings: fieldSettings,
  customViews: {
    customItemView: GardenItem,
    customHeaderView: GardenHeader,
    customGroupByView: GardenGroupBy,
  },
  visuals: {
    calculateItemWidth: getItemWidth,
    highlightHorizontalColumn: getHighlightedColumn,
    rowHeight: 30,
  },
};
