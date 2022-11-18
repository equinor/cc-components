import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { CustomGroupByKeys, ExtendedGardenFields, Punch } from '../types';
import { fieldSettings, getHighlightedColumn } from '../utils-garden';
export const gardenConfig: GardenConfig<Punch, ExtendedGardenFields, CustomGroupByKeys> =
  {
    getDisplayName: (item) => item.punchItemNo,
    initialGrouping: { horizontalGroupingAccessor: 'RFC', verticalGroupingKeys: [] },
    customGroupByKeys: {
      plannedForecast: 'Planned',
      weeklyDaily: 'Weekly',
    },
    fieldSettings: fieldSettings,
    visuals: {
      highlightHorizontalColumn: getHighlightedColumn,
    },
  };
