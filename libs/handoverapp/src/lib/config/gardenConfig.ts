import { GardenConfig } from '@equinor/workspace-fusion/garden';
import {
  ExtendedGardenFields,
  HandoverCustomGroupByKeys,
  HandoverPackage,
} from '../types';
import { GardenGroupBy, GardenHeader } from '../ui-garden';
import { GardenItem } from '../ui-garden/Item';
import { fieldSettings, getHighlightedColumn, getItemWidth } from '../utils-garden';

export const gardenConfig: GardenConfig<
  HandoverPackage,
  ExtendedGardenFields,
  HandoverCustomGroupByKeys,
  Record<'maxVolume', number>
> = {
  initialGrouping: {
    horizontalGroupingAccessor: 'RFCC',
    verticalGroupingKeys: [],
  },
  getDisplayName: (item) => item.commpkgNo,
  fieldSettings: fieldSettings,
  customGroupByKeys: {
    plannedForecast: 'Forecast',
    weeklyDaily: 'Weekly',
  },
  customViews: {
    customHeaderView: GardenHeader,
    customGroupByView: GardenGroupBy,
    customItemView: GardenItem,
  },
  visuals: {
    calculateItemWidth: getItemWidth,
    highlightHorizontalColumn: getHighlightedColumn,

    rowHeight: 30,
  },
};
