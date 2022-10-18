import { SwcrStatus } from '../types';
import { SwcrPackageStatusPriority } from './swcrPackageStatusPriority';

export const getSwcrStatusPriority = (status: SwcrStatus): number => {
  return SwcrPackageStatusPriority[status];
};
