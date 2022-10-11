import { DateTime } from 'luxon';
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
