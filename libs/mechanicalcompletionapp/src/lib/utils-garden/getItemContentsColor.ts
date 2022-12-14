import { itemContentColors } from '@cc-components/shared';
import { CommissioningStatus } from '../types';

export const getItemContentsColor = (status: CommissioningStatus): string => {
  return status === 'RFOC Accepted' || status === 'Punch status accepted'
    ? itemContentColors.Dark
    : itemContentColors.Light;
};
