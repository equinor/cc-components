import { DateTime } from 'luxon';
import { getYearAndWeekFromDate } from './getYearAndWeekFromDate';

export const getYearAndWeekFromString = (dateString: string): string => {
  const date = new Date(dateString);
  return DateTime.fromJSDate(date).isValid ? getYearAndWeekFromDate(date) : 'N/A';
};
