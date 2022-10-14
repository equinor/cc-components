import { ProcosysStatuses } from '@cc-components/shared';

export const orderedProCoSysStatuses: ProcosysStatuses[] = [
  ProcosysStatuses.NoStatus,
  ProcosysStatuses.Prepared,
  ProcosysStatuses.ToMC,
  ProcosysStatuses.MCDocsPrepared,
  ProcosysStatuses.ToField,
  ProcosysStatuses.FromField,
  ProcosysStatuses.ComplByMC,
  ProcosysStatuses.Cancelled,
  ProcosysStatuses.SentDC,
  ProcosysStatuses.ASBuiltCompleted,
  ProcosysStatuses.SentToPlanning,
];
