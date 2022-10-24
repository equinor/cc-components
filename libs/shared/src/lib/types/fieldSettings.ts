//TODO: TEMP WHOLE FILE
export type GetSortFunction = (a: string, b: string) => number;
export type GetKeyFunction<
  T,
  ExtendedFields extends unknown = unknown,
  CustomGroupByKeys extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
> = (
  item: T,
  itemKey: keyof T | ExtendedFields extends unknown ? never : ExtendedFields,
  customGroupByKeys?: CustomGroupByKeys
) => string[] | string;

export type FieldSetting<
  ItemType,
  ExtendedFields extends string = never,
  CustomGroupByKeys extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
> = {
  key?: keyof ItemType | string;
  label?: string;
  getKey?: GetKeyFunction<ItemType, ExtendedFields, CustomGroupByKeys>;
  getColumnSort?: GetSortFunction;
};

/**
 * Define Fields that should be used in garden.
 * ItemType and ExtendedFields (optional) are combined on keys, to create a partial record for fields.
 * Garden will use all specified fields to build its group by selection.
 * Fields that are not specified, will be ignored
 *
 * @template ItemType  Base model for item/package used. Is the type that is passed to functions.
 * @template ExtendedFields (optional) string literal that defines fields that does not exist on the base model.
 */
export type FieldSettings<
  ItemType,
  ExtendedFields extends string = never,
  CustomGroupByKeys extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
> = Partial<
  Record<
    keyof ItemType | ExtendedFields,
    FieldSetting<ItemType, ExtendedFields, CustomGroupByKeys>
  >
>;
