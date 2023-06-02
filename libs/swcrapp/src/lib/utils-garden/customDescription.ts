import { SoftwareChangeRecord } from '@cc-components/swcrshared';
import { GardenItem } from '@equinor/workspace-fusion/garden';
export const customDescription = (
  swcr: SoftwareChangeRecord | GardenItem<SoftwareChangeRecord>
) => {
  //TODO: TS check
  const item = swcr as SoftwareChangeRecord;
  return `${item.title} ${
    ''
    // parseInt(item.estimatedManhours) > 0 ? `(${item.estimatedManhours}h)` : ''
  }`;
};
