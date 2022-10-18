import { SwcrPackage } from '../types';

export const customDescription = (item: SwcrPackage) => {
  return `${item.title} ${
    parseInt(item.estimatedManhours) > 0 ? `(${item.estimatedManhours}h)` : ''
  }`;
};
