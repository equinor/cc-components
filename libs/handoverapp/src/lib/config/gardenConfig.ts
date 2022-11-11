/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import {
  ExtendedGardenFields,
  HandoverCustomGroupByKeys,
  HandoverPackage,
} from '../types';
import { GardenGroupBy, GardenHeader } from '../ui-garden';
import { GardenItem } from '../ui-garden/Item';
import {
  fieldSettings,
  getHighlightedColumn,
  getItemWidth,
  getMaxVolumeFromData,
} from '../utils-garden';

export const gardenConfig: GardenConfig<
  HandoverPackage,
  ExtendedGardenFields,
  HandoverCustomGroupByKeys
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
  getCustomState: (data) => ({ maxVolume: getMaxVolumeFromData(data) }),
};
