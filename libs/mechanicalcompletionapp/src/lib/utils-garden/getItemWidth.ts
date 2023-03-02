import { McPackage } from '@cc-components/mechanicalcompletionshared';
import { hasProperty } from '@cc-components/shared/utils-typescript';
import {
  GardenGroups,
  getGardenItems,
  isSubGroup,
} from '@equinor/workspace-fusion/garden';
import { ExtendedGardenFields } from '../types';

export const getItemWidth = (
  garden: GardenGroups<McPackage>,
  groupByKey: keyof McPackage | ExtendedGardenFields
) => {
  const gardenItemList: McPackage[] = [];
  garden.forEach((column) => {
    const gardenItems = getGardenItems(column);
    gardenItems &&
      gardenItems.forEach((gardenItem) => {
        !isSubGroup(gardenItem) && gardenItemList.push(gardenItem.item);
      });
  });

  const longestKey = Math.max(
    ...gardenItemList.map((item) => {
      const titleLength = hasProperty(item, groupByKey)
        ? item?.[groupByKey]
          ? String(item[groupByKey]).length
          : 0
        : 0;
      return titleLength >= item.mcPkgNumber.length
        ? titleLength
        : item.mcPkgNumber.length;
    })
  );

  return Math.max(longestKey * 8 + 80, 102);
};
