import { hasProperty } from '@cc-components/shared';
import { SwcrPackage } from '@cc-components/swcrshared';
import {
  GardenGroups,
  getGardenItems,
  isSubGroup,
} from '@equinor/workspace-fusion/garden';
import { ExtendedGardenFields } from '../types';

export const getItemWidth = (
  garden: GardenGroups<SwcrPackage>,
  groupByKey: keyof SwcrPackage | ExtendedGardenFields
) => {
  const gardenItemList: SwcrPackage[] = [];
  const columnName = groupByKey
    .replace('nextSignatureBy', 'nextToSign')
    .replace('nextSignatureRole', 'nextToSign');

  garden.forEach((column) => {
    const gardenItems = getGardenItems(column);
    gardenItems &&
      gardenItems.forEach((gardenItem) => {
        !isSubGroup(gardenItem) && gardenItemList.push(gardenItem.item);
      });
  });

  const longestKey = Math.max(
    ...gardenItemList.map((gardenItem) => {
      const titleLength = hasProperty(gardenItem, columnName)
        ? gardenItem[columnName]
          ? gardenItem[columnName].length
          : 0
        : 0;
      return titleLength >= gardenItem.swcrNo.length
        ? titleLength
        : gardenItem.swcrNo.length;
    })
  );
  return Math.max(longestKey * 8 + 85, 170);
};
