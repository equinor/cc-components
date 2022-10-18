import { SwcrStatus } from '../types';
import { getSwcrStatusPriority } from './getSwcrStatusPriority';

export const sortBySwcrStatusPriority = (a: string, b: string): number => {
  return getSwcrStatusPriority(a as SwcrStatus) - getSwcrStatusPriority(b as SwcrStatus);
};
