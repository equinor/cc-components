import { SwcrPackage } from '@cc-components/swcrshared';
import { GardenItem } from '@equinor/workspace-fusion/garden';
export const customDescription = (swcr: SwcrPackage | GardenItem<SwcrPackage>) => {
  //TODO: TS check
  const item = swcr as SwcrPackage;
  return `${item.title} ${
    (item.estimatedManHours) > 0 ? `(${item.estimatedManHours}h)` : ''
  }`;
};
