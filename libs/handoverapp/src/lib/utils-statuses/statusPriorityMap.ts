import { PackageStatus } from '@cc-components/shared/types';

export const statusPriorityMap: Record<PackageStatus, number> = {
  'RFO Accepted': 0,
  'RFO Sent': 1,

  'TAC Accepted': 2,
  'TAC Sent': 3,

  'RFC Accepted': 4,
  'RFC Sent': 5,
  "RFC Partly signed":6,

  'RFR Accepted': 6,
  'RFR Sent': 7,
  'DCC Accepted': 8,
  'DCC Sent': 9,
  OS: 10,
  'No status': 11,

  'RFC Rejected': 12,
  'TAC Rejected': 13,
  'RFO Rejected': 14,
  PA: 14,
  PB: 15,
  OK: 16,
};
