/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { GardenItem } from '@equinor/workspace-fusion/garden';
import { SwcrPackage } from '../types';
export const customDescription = (item: SwcrPackage | GardenItem<SwcrPackage>) => {
  return `${item.title} ${
    parseInt(item.estimatedManhours) > 0 ? `(${item.estimatedManhours}h)` : ''
  }`;
};
