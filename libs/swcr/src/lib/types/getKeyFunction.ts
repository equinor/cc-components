//TODO: Temp
export type GetKeyFunction<T> = (
  item: T,
  itemKey: keyof T | string,
  customGroupByKeys?: Record<string, unknown>
) => string[] | string;
