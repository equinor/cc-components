import { SwcrPackage } from '@cc-components/swcrshared';
import { GardenItem } from '@equinor/workspace-fusion/garden';
export const customDescription = (swcr: SwcrPackage | GardenItem<SwcrPackage>) => {
  //TODO: TS check
  const item = swcr as SwcrPackage;
  return `${item.title} ${
    parseInt(item.estimatedManhours) > 0 ? `(${item.estimatedManhours}h)` : ''
  }`;
};
