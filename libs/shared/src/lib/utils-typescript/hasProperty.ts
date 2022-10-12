export const hasProperty = <T extends unknown>(
  item: T,
  property: PropertyKey
): property is keyof T => {
  return item?.[property as keyof T] !== undefined ? true : false;
};
