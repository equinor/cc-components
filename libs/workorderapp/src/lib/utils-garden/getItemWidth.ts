import { hasProperty } from '@cc-components/shared';
import { WorkOrder } from '@cc-components/workordershared';
import {
  GardenGroups,
  getGardenItems,
  isSubGroup,
} from '@equinor/workspace-fusion/garden';
import { ExtendedGardenFields } from '../types';

export const getItemWidth = (
  garden: GardenGroups<WorkOrder>,
  groupByKey: keyof WorkOrder | ExtendedGardenFields
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
