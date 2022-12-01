import { SwcrStatus } from '@cc-components/swcrshared';
import { SwcrPackageStatusPriority } from './swcrPackageStatusPriority';

export const getSwcrStatusPriority = (status: SwcrStatus): number => {
  return SwcrPackageStatusPriority[status];
};
