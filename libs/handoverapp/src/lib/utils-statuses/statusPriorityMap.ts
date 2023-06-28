import { PackageStatus } from '@cc-components/shared/types';

export const statusPriorityMap: Record<PackageStatus, number> = {
  'RFO Accepted': 0,
  'RFO Partly Signed' :1,
  'RFO Sent': 1,

  'TAC Accepted': 2,
  'TAC Sent': 3,

  'RFC Accepted': 4,
  'RFC Partly Sent': 4,
  'RFC Sent': 5,
  'RFC Partly signed': 6,

  'RFR Accepted': 7,
  'RFR Sent': 8,
  'DCC Accepted': 9,
  'DCC Sent': 10,
  OS: 11,
  'No status': 12,

  'RFC Rejected': 13,
  'TAC Rejected': 14,
  'RFO Rejected': 15,
  PA: 16,
  PB: 17,
  OK: 18,
};
