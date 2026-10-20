import { itemContentColors } from '@cc-components/shared/mapping';

export const getItemContentsColor = (status: string): string => {
  return status === 'RFOC Accepted' || status === 'Punch status accepted'
    ? itemContentColors.Dark
    : itemContentColors.Light;
};
