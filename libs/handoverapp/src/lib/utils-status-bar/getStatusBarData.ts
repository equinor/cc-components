import { HandoverPackage } from '@cc-components/handovershared';
import { KPI } from '../types';
import { getKPIStatus } from './getKPIStatus';

/**
 * Function to count the number of packages that are in status X, packages that are
 * overdue and sum of rfo vs target.
 */
export const getStatusBarData = (data: HandoverPackage[]): Record<KPI, number> => {
  return data.reduce(
    (acc, curr) => {
      /** status */
      const pkgStatus = getKPIStatus(curr);
      acc[pkgStatus] = acc[pkgStatus] + 1;

      /** overdue */
      if (
        curr.rfoActualDate === null &&
        curr.rfoPlannedDate &&
        new Date(curr.rfoPlannedDate).getTime() < new Date().getTime()
      ) {
        acc.overdue = acc.overdue + 1;
      }

      /** rfo vs target */
      if (
        curr.rfoPlannedDate &&
        new Date(curr.rfoPlannedDate).getTime() <= new Date().getTime()
      ) {
        acc.targetSum = acc.targetSum + 1;
      }

      return acc;
    },
    {
      'RFOC Accepted': 0,
      'RFOC Partly': 0,
      'RFOC Sent': 0,
      OS: 0,
      overdue: 0,
      targetSum: 0,
    } as Record<KPI, number>
  );
};
