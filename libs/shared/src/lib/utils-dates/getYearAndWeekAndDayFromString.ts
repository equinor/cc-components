import { DateTime } from 'luxon';
export const getYearAndWeekAndDayFromString = (dateString: string): `N/A` | string => {
  const date = new Date(dateString);
  const dateTime = DateTime.fromJSDate(date);
  if (!dateTime.isValid) return 'N/A';
  return `${dateTime.year}-${dateTime.month}-${dateTime.day}`;
};
