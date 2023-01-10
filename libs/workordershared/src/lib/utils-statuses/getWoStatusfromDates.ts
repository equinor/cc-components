import { ProcosysStatuses } from '@cc-components/shared';
import { WorkOrder } from '@cc-components/workordershared';

export const getWoStatusFromDates = (workOrder: WorkOrder): ProcosysStatuses => {
  if (workOrder.w10ActualDate) return ProcosysStatuses.SentToPlanning;
  if (workOrder.w9ActualDate) return ProcosysStatuses.ASBuiltCompleted;
  if (workOrder.w8ActualDate) return ProcosysStatuses.SentDC;
  if (workOrder.w7ActualDate) return ProcosysStatuses.Cancelled;
  if (workOrder.w6ActualDate) return ProcosysStatuses.ComplByMC;
  if (workOrder.w5ActualDate) return ProcosysStatuses.FromField;
  if (workOrder.w4ActualDate) return ProcosysStatuses.ToField;
  if (workOrder.w3ActualDate) return ProcosysStatuses.MCDocsPrepared;
  if (workOrder.w2ActualDate) return ProcosysStatuses.ToMC;
  if (workOrder.w1ActualDate) return ProcosysStatuses.Prepared;

  return ProcosysStatuses.NoStatus;
};
