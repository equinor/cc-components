import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { ExtendedGardenFields, Punch } from '../types';
import { fieldSettings, getHighlightedColumn } from '../utils-garden';
export const gardenConfig: GardenConfig<Punch, ExtendedGardenFields> =
  {
    getDisplayName: (item) => item.punchItemNo,
    initialGrouping: { horizontalGroupingAccessor: 'RFC', verticalGroupingKeys: [] },
    fieldSettings: fieldSettings,
    visuals: {
      highlightHorizontalColumn: getHighlightedColumn,
    },
  };
