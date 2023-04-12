/**
 * Function that accepts a date string and returns a formatted date string
 * @param dateString Date string to format
 * @returns The formatted date string DD/MM/YYY or 'N/A' if the date string is falsy or invalid.
 */
export const formatDateString = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (date.toString() === 'Invalid Date') return 'N/A';
  const dateParts = new Intl.DateTimeFormat(undefined).formatToParts(date);
  return `${dateParts[0].value}/${dateParts[2].value}/${dateParts[4].value}`;
};
