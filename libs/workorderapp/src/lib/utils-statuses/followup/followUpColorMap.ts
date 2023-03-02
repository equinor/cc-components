import { FollowUpStatuses } from '@cc-components/shared/types';

export const followUpColorMap: Record<FollowUpStatuses, string> = {
  [FollowUpStatuses.WOFinished]: '#1169d9',
  [FollowUpStatuses.MaterialAndWoOk]: '#45aa42',
  [FollowUpStatuses.MaterialAndWoAvailable]: '#fcc330',
  [FollowUpStatuses.MaterialAndOrWoNotAvailable]: '#ff3335',
};
