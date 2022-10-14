import { FollowUpStatuses } from '@cc-components/shared';

export const followUpStatusPriorityMap: Record<FollowUpStatuses, number> = {
  [FollowUpStatuses.MaterialAndOrWoNotAvailable]: 3,
  [FollowUpStatuses.MaterialAndWoAvailable]: 2,
  [FollowUpStatuses.MaterialAndWoOk]: 1,
  [FollowUpStatuses.WOFinished]: 0,
};
