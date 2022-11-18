import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { CustomGroupByKeys, ExtendedGardenFields, Punch } from '../types';
import { getHighlightedColumn } from '../utils-garden';
import { fieldSettings } from '../utils-garden/fieldSettings';
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
