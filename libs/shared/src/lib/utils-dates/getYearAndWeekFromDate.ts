import { DateTime } from 'luxon';
/**
 * Function that accepts a Date object and extracts the year and week number from it.
 * @param date A date object
 * @returns The formatted date as YYYY-WW
 */
export const getYearAndWeekFromDate = (date: Date): string => {
  const dateTime = DateTime.local(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  return `${dateTime.year}-${
    dateTime.weekNumber < 10 ? '0' + dateTime.weekNumber : dateTime.weekNumber
  }`;
};
