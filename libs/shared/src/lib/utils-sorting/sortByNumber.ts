/**
 * Sort function that accepts two numeric strings and sorts based on number.
 */
export const sortByNumber = (a: string, b: string): number =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
