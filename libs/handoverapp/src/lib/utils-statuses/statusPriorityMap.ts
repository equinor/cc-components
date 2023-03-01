import { PackageStatus } from '@cc-components/shared/types';

export const statusPriorityMap: Record<PackageStatus, number> = {
  'RFOC Accepted': 0,
  'RFOC Sent': 1,

  'TAC Accepted': 2,
  'TAC Sent': 3,

  'RFCC Accepted': 4,
  'RFCC Sent': 5,

  'RFRC Accepted': 6,
  'RFRC Sent': 7,
  'DCC Accepted': 8,
  'DCC Sent': 9,
  OS: 10,
  'No status': 11,

  'RFCC Rejected': 12,
  'TAC Rejected': 13,
  'RFOC Rejected': 14,
  PA: 14,
  PB: 15,
  OK: 16,
};
