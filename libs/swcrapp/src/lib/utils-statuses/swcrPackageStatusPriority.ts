import { SwcrStatus } from '@cc-components/swcrshared';

export const SwcrPackageStatusPriority: Record<SwcrStatus, number> = {
  'Not initiated': 1,
  Initiated: 2,
  Accepted: 3,
  'Ready for Retest': 4,
  Tested: 5,
  Closed: 6,
  'Closed - Rejected': 7,
};
