import { Loop } from '@cc-components/loopshared';
import {
  GardenGroups,
  getGardenItems,
  isSubGroup,
} from '@equinor/workspace-fusion/garden';
import { CustomGroupByKeys, ExtendedGardenFields } from '../types';
import { getFieldKeyBasedOnPlannedForecast } from './getFieldKeyBasedOnPlannedForecast';

export const getItemWidth = (
  garden: GardenGroups<Loop>,
  groupByKey: keyof Loop | ExtendedGardenFields,
  _customGroupByKeys: CustomGroupByKeys | undefined
) => {
  const columnName = getFieldKeyBasedOnPlannedForecast(groupByKey);
  const minWidth = 139;
  const gardenItemList: Loop[] = [];
  garden.forEach((column) => {
    const gardenItems = getGardenItems(column);
    gardenItems &&
      gardenItems.forEach((gardenItem) => {
        !isSubGroup(gardenItem) && gardenItemList.push(gardenItem.item);
      });
  });
  const longestKey = Math.max(
    ...gardenItemList.map((item) => {
      const itemColumnString = item[columnName] ? item[columnName]?.toString() : '';
      const titleLength = itemColumnString
        ? itemColumnString.replace('@LOOP-', '').length
        : 0;
      return titleLength >= item.loopNo.length
        ? titleLength
        : item.loopNo.replace('@LOOP-', '').length;
    })
  );
  return Math.max(longestKey * 8 + 50, minWidth);
};
