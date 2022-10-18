import { SwcrStatus } from '../types';
import { getSwcrStatusPriority } from '../utils-statuses';

export const sortByLastSignedRanking = (a: string, b: string): number => {
  const [aRank, aStatus] = a.split(' ');
  const [bRank, bStatus] = b.split(' ');

  return (
    aRank.localeCompare(bRank, undefined, { numeric: true, sensitivity: 'base' }) ||
    getSwcrStatusPriority(aStatus as SwcrStatus) -
      getSwcrStatusPriority(bStatus as SwcrStatus)
  );
};
