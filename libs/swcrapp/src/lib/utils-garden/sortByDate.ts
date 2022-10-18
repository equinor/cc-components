import { DATE_BLANKSTRING } from '../constants/dateBlankString';

export const sortByDate = (a: string, b: string) => {
  if (a === DATE_BLANKSTRING) return -1;
  if (b === DATE_BLANKSTRING) return 1;
  if (a === b) return 0;

  return a.localeCompare(b);
};
