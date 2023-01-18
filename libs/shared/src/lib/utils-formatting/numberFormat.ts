/**
 * Function to format a number into a string with space between every thousand.
 * @param number Number to format
 * @returns Formatted number as string
 * @example 12300 -> "12 300"
 */
export function numberFormat(number: number): string {
  return parseFloat(Math.round(number).toString()).toLocaleString('no');
}
