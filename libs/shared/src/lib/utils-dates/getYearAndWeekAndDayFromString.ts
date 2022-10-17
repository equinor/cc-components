import { DateTime } from 'luxon';
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
