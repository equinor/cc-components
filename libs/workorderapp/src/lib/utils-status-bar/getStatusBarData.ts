import { FollowUpStatuses } from '@cc-components/shared';
import { WorkOrder } from '@cc-components/workordershared';
import { Kpi } from '../types';
import { getFollowUpStatus } from '../utils-statuses';

export const getStatusBarData = (workOrders: WorkOrder[]) => {
  const sum = workOrders.reduce(
    (acc, curr) => {
      const followUpStatus = getFollowUpStatus(curr);

      // Mhrs total
      acc.estMhrs += Number(curr.estimatedHours);

      // Mhrs not available
      if (followUpStatus === FollowUpStatuses.MaterialAndOrWoNotAvailable) {
        acc.remMhrsNotAvailable += Number(curr.remainingHours);
      }

      // Mhrs available
      if (followUpStatus === FollowUpStatuses.MaterialAndWoAvailable) {
        acc.remMhrsAvailable += Number(curr.remainingHours);
      }
      // Mhrs ready for execution
      if (followUpStatus === FollowUpStatuses.MaterialAndWoOk) {
        acc.remMhrsWoOk += Number(curr.remainingHours);
      }

      // Mhrs completed
      acc.expMhrsCompleted += Number(curr.expendedHours);

      // Mhrs remaining
      acc.remMhrs += Number(curr.remainingHours);
      return acc;
    },
    {
      estMhrs: 0,
      expMhrsCompleted: 0,
      remMhrs: 0,
      remMhrsWoOk: 0,
      remMhrsAvailable: 0,
      remMhrsNotAvailable: 0,
    } as Kpi
  );

  return sum;
};
