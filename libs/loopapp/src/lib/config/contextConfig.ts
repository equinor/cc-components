import { Loop } from '../types';

export const contextConfig = (data: Loop[]) => {
  const maxHrs = data.reduce(
    (acc, curr) => {
      // Rem mhrs
      if (acc.maxRemHours < Number(curr.remainingManHours ?? '0')) {
        acc.maxRemHours = Number(curr.remainingManHours);
      }
      return acc;
    },
    {
      maxRemHours: 0,
    }
  );

  return {
    maxRemHrs: maxHrs.maxRemHours,
  };
};
