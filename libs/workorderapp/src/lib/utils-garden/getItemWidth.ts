import { hasProperty } from '@cc-components/shared';
import {
  GardenGroups,
  getGardenItems,
  isSubGroup,
} from '@equinor/workspace-fusion/garden';
import { WorkOrder } from '../types';

export const getItemWidth = (
  garden: GardenGroups<WorkOrder>,
  groupByKey: string
): number => {
  const columnName = groupByKey.replace('Code', '');
  const checkHeaderLength = ['milestone', 'responsible', 'discipline'].includes(
    columnName
  );
  const gardenItemList: WorkOrder[] = [];
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
      if (checkHeaderLength && hasProperty(item, columnName)) {
        const column = item[columnName];
        titleLength = column ? column.length : 0;
      }
      return titleLength >= item.workOrderNumber.length
        ? titleLength
        : item.workOrderNumber.length;
    })
  );

  return Math.max(longestKey * 8 + 80, 102);
};
