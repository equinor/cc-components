import { DateTime } from 'luxon';

export const toDate = (date: unknown) => {
  if (!date) {
    return undefined;
  }
  try {
    const newDate = new Date(date as string);
    return DateTime.fromJSDate(newDate).isValid
      ? DateTime.fromJSDate(newDate)
      : undefined;
  } catch {
    return undefined;
  }
};
