import { FollowUpStatuses, ProcosysStatuses } from '@cc-components/shared/types';

export const getTextColorByStatus = (status: string) => {
  return status === FollowUpStatuses.WOFinished || status === ProcosysStatuses.ComplByMC
    ? '#ffffff'
    : '#212121';
};
