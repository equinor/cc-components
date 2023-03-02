import { getYearAndWeekFromString } from '@cc-components/shared/utils-dates';
import { DATE_BLANKSTRING } from '../utils-keys/constants';

export const getDateKey = (dateString: string | null): string => {
  if (!dateString) return DATE_BLANKSTRING;

  return getYearAndWeekFromString(dateString, 0, DATE_BLANKSTRING);
};
