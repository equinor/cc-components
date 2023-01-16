import { WorkOrder } from '@cc-components/workordershared';

export const contextConfig = (data: WorkOrder[]) => {
  const maxHrs = data.reduce(
    (acc, curr) => {
      // Est mhrs
      if (acc.maxEstHrs < Number(curr.estimatedHours ?? '0')) {
        acc.maxEstHrs = Number(curr.estimatedHours);
      }
      //Rem mhrs
      if (acc.maxRemHrs < Number(curr.remainingHours ?? '0')) {
        acc.maxRemHrs = Number(curr.remainingHours);
      }
      //Exp mhrs
      if (acc.maxExpHrs < Number(curr.expendedHours ?? '0')) {
        acc.maxExpHrs = Number(curr.expendedHours);
      }
      return acc;
    },
    {
      maxEstHrs: 0,
      maxRemHrs: 0,
      maxExpHrs: 0,
    }
  );
  return {
    maxEstHrs: maxHrs.maxEstHrs,
    maxRemHrs: maxHrs.maxRemHrs,
    maxExpHrs: maxHrs.maxExpHrs,
  };
};
