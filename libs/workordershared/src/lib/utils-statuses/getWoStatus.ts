import { ProcosysStatuses } from '@cc-components/shared/types';
import { WorkOrder } from '../types';
import { getWoStatusFromDates } from './getWoStatusfromDates';

/**
 * Function to retrieve a package's status based on its jobStatus property.
 * If there are no appropriate jobStatus values, the status will be based on
 * w1-w10 actual date properties.
 */
export const getWoStatus = (workOrder: WorkOrder): ProcosysStatuses => {
  switch (workOrder.jobStatus) {
    case 'W01':
      return ProcosysStatuses.Prepared;

    case 'W02':
      return ProcosysStatuses.ToMC;

    case 'W03':
      return ProcosysStatuses.MCDocsPrepared;

    case 'W04':
      return ProcosysStatuses.ToField;

    case 'W05':
      return ProcosysStatuses.FromField;

    case 'W06':
      return ProcosysStatuses.ComplByMC;

    case 'W07':
      return ProcosysStatuses.Cancelled;

    case 'W08':
      return ProcosysStatuses.SentDC;

    case 'W09':
      return ProcosysStatuses.ASBuiltCompleted;

    case 'W10':
      return ProcosysStatuses.SentToPlanning;
  }

  return getWoStatusFromDates(workOrder);
};
