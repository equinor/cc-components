import { DateTime } from 'luxon';
/**
 * Function that accepts a date string and extracts the year, week and day from it.
 * @param dateString The date to be formatted
 * @returns A formatted date string YYYY-MM-DD or 'N/A' if the date is falsy or invalid.
 */
export const getYearAndWeekAndDayFromString = (
  dateString: string | undefined
): `N/A` | string => {
  if (dateString === undefined) {
    return 'N/A';
  }
  const date = new Date(dateString);
  const dateTime = DateTime.fromJSDate(date);
  if (!dateTime.isValid) return 'N/A';
  return `${dateTime.year}-${dateTime.month}-${dateTime.day}`;
};
