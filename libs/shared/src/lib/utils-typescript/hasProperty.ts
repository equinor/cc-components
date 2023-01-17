/**
 * Checks if an object Y has property X.
 * @param item The object that you want to see if has property X
 * @param property The property you want to see if exists on object Y.
 * @returns True if property X exists on object Y.
 */
export const hasProperty = <T extends unknown>(
  item: T,
  property: PropertyKey
): property is keyof T => {
  return item?.[property as keyof T] !== undefined ? true : false;
};
