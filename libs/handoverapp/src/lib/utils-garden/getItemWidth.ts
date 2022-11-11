import {
  GardenGroups,
  getGardenItems,
  isSubGroup,
} from '@equinor/workspace-fusion/garden';
import { getFieldKeyBasedOnPlannedForecast } from '.';
import {
  ExtendedGardenFields,
  HandoverCustomGroupByKeys,
  HandoverPackage,
} from '../types';

const MIN_WIDTH = 139;

export const getItemWidth = (
  garden: GardenGroups<HandoverPackage>,
  groupByKey: ExtendedGardenFields | keyof HandoverPackage,
  customgroupByKeys: HandoverCustomGroupByKeys
): number => {
  const customKeys = customgroupByKeys;
  const columnName = getFieldKeyBasedOnPlannedForecast(
    groupByKey,
    customKeys?.plannedForecast
  );

  const gardenItemList: HandoverPackage[] = [];
  garden.forEach((column) => {
    const gardenItems = getGardenItems(column);
    gardenItems &&
      gardenItems.forEach((gardenItem) => {
        !isSubGroup(gardenItem) && gardenItemList.push(gardenItem.item);
      });
  });

  const longestKey = Math.max(
    ...gardenItemList.map((item) => {
      let titleLength = 0;
      if (item[columnName]) {
        titleLength = item[columnName]?.toString().length ?? titleLength;
      }
      return titleLength >= item.commpkgNo.length ? titleLength : item.commpkgNo.length;
    })
  );
  return Math.max(longestKey * 8 + 80, MIN_WIDTH);
};
