import { DateTime } from 'luxon';
import { getYearAndWeekFromDate } from './getYearAndWeekFromDate';
/**
 * Function that accepts a date string and extract year and week from it, with possibility to remove days.
 * @param dateString The date to format
 * @param removeDays Number of days to remove
 * @returns The formatted date string as YYYY-WW or 'N/A' if the date is falsy or invalid.
 */
export const getYearAndWeekFromString = (
  dateString: string | undefined,
  removeDays = 0,
  invalidDateReturn = "N/A",
): string => {
  if (dateString === undefined) {
    return invalidDateReturn;
  }
  const date = new Date(dateString);
  return DateTime.fromJSDate(date).isValid
    ? getYearAndWeekFromDate(
        removeDays ? new Date(date.setDate(date.getDate() - removeDays)) : date
      )
    : invalidDateReturn;
};
