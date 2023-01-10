import { WorkOrder } from '@cc-components/workordershared';
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { ExtendedGardenFields } from '../types';
import { GardenHeader, GardenItem } from '../ui-garden';
import { getHighlightedColumn, getItemWidth } from '../utils-garden';
import { fieldSettings } from '../utils-garden/fieldSettings';
import { sortPackages } from '../utils-garden/sortPackages';

export const gardenConfig: GardenConfig<WorkOrder, ExtendedGardenFields> = {
  getDisplayName: (item) => item.workOrderNumber,
  initialGrouping: { horizontalGroupingAccessor: 'fwp', verticalGroupingKeys: [] },
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
  intercepters: {
    postGroupSorting: (data, keys) => {
      data.forEach(({ items }) => {
        items = sortPackages(items, ...keys);
      });
      return data;
    },
  },
};
