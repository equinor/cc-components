import { FollowUpStatuses, ProcosysStatuses } from '@cc-components/shared';
import { itemContentColors } from '@cc-components/shared/mapping';

export const getTextColorByStatus = (status: string) => {
  return status === FollowUpStatuses.WOFinished || status === ProcosysStatuses.ComplByMC
    ? itemContentColors.Dark
    : itemContentColors.Light;
};
