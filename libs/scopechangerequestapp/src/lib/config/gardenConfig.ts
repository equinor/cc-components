import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { ScopeChangeRequest } from '../types';
import { fieldSettings } from '../utils-garden/fieldSettings';

export const gardenConfig: GardenConfig<ScopeChangeRequest> = {
  getDisplayName: (item) => item.serialNumber,
  initialGrouping: {
    horizontalGroupingAccessor: 'handoverPlan',
    verticalGroupingKeys: [],
  },
  fieldSettings: fieldSettings,
};
