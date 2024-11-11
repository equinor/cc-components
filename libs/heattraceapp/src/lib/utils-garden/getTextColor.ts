import { itemContentColors } from '@cc-components/shared/mapping';

export const getTextColor = (status: string) => {
  if (status === 'Pressure test' || status === 'Insulation' || status === 'Complete')
    return itemContentColors.Light;

  return itemContentColors.Dark;
};
