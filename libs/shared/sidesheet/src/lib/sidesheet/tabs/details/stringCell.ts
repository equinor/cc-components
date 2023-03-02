/**
 * Function to remove leading and trailing white space of a string.
 * If the string is falsy, component will return 'N/A'
 */
export const stringCell = (value: string | null): string =>
  value ? value.trim() : 'N/A';
