import { DateTime } from 'luxon';
import { getYearAndWeekFromDate } from './getYearAndWeekFromDate';

export const getYearAndWeekFromString = (
  dateString: string | undefined,
  removeDays = 0
): string => {
  if (dateString === undefined) {
    return 'N/A';
  }
  const date = new Date(dateString);
  return DateTime.fromJSDate(date).isValid
    ? getYearAndWeekFromDate(
        removeDays ? new Date(date.setDate(date.getDate() - removeDays)) : date
      )
    : 'N/A';
};
