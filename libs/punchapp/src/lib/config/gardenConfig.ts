import { Punch } from '@cc-components/punchshared';
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import PunchGardenItem from '../ui-garden/PunchGardenItem';
import { fieldSettings, getHighlightedColumn } from '../utils-garden';

export const gardenConfig: GardenConfig<Punch> =
  {
    getDisplayName: (item) => item.punchItemNo,
    initialGrouping: { horizontalGroupingAccessor: 'handoverPlan', verticalGroupingKeys: [] },
    fieldSettings: fieldSettings,
    visuals: {
      highlightHorizontalColumn: getHighlightedColumn,
      calculateItemWidth: () => 150,
      rowHeight: 25,
    },
    customViews: {
      customItemView: PunchGardenItem,
    },
    
  };
