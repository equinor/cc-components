import { ProcosysStatuses } from '@cc-components/shared';

export const proCoSysStatusPriorityMap: Record<ProcosysStatuses, number> = {
  [ProcosysStatuses.ASBuiltCompleted]: 0,
  [ProcosysStatuses.SentToPlanning]: 1,
  [ProcosysStatuses.SentDC]: 2,
  [ProcosysStatuses.ComplByMC]: 3,
  [ProcosysStatuses.FromField]: 4,
  [ProcosysStatuses.ToField]: 5,
  [ProcosysStatuses.MCDocsPrepared]: 6,
  [ProcosysStatuses.ToMC]: 7,
  [ProcosysStatuses.Cancelled]: 8,
  [ProcosysStatuses.Prepared]: 9,
  [ProcosysStatuses.NoStatus]: 10,
};
