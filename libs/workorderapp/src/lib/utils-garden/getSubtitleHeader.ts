import { FollowUpStatuses } from '@cc-components/shared/types';
import { getYearAndWeekFromDate } from '@cc-components/shared/utils-dates';
import { WorkOrder } from '@cc-components/workordershared';
import {
  GardenGroups,
  getGardenItems,
  isSubGroup,
} from '@equinor/workspace-fusion/garden';
import { getFollowUpStatus } from '../utils-statuses';

const shouldCountHours = (workOrder: WorkOrder): boolean =>
  workOrder?.plannedStartupDate?.length &&
  [FollowUpStatuses.MaterialAndWoOk, FollowUpStatuses.MaterialAndWoAvailable].includes(
    getFollowUpStatus(workOrder)
  )
    ? true
    : false;

const currentWeekAndYear = getYearAndWeekFromDate(new Date());

export const getSubtitleHeader = (
  garden: GardenGroups<WorkOrder>,
  columnIndex: number,
  columnIsExpanded: boolean,
  groupByKey?: string
): string | undefined => {
  if (groupByKey !== 'hwp') {
    return;
  }
  const headerValue = garden[columnIndex].value;
  const headerValueIsToday = headerValue.localeCompare(currentWeekAndYear, 'en', {
    numeric: true,
  });
  const items = garden[columnIndex].items;
  const gardenItemList: WorkOrder[] = [];
  garden.forEach((column) => {
    const gardenItems = getGardenItems(column);
    gardenItems &&
      gardenItems.forEach((gardenItem) => {
        !isSubGroup(gardenItem) && gardenItemList.push(gardenItem.item);
      });
  });
  let hours: number[] = [];
  let expandedColumnHours = '';
  if (headerValueIsToday === 0) {
    const currentWeekAndYearAsInt = parseInt(currentWeekAndYear.replace(/-/gi, ''), 10);
    hours = gardenItemList
      .filter(shouldCountHours)
      .filter(
        (wo) =>
          parseInt(
            getYearAndWeekFromDate(new Date(wo?.plannedStartupDate || '')).replace(
              /-/gi,
              ''
            ),
            10
          ) -
            currentWeekAndYearAsInt <=
          0
      )
      .map((wo) => Number(wo.remainingHours));
  } else {
    hours = items.filter(shouldCountHours).map((wo) => Number(wo.remainingHours)) || [0];
  }

  if (headerValueIsToday === 0 && columnIsExpanded) {
    const weekHours = (
      items.filter(shouldCountHours).map((wo) => Number(wo.remainingHours) || 0) || [0]
    ).reduce((acc, curr) => (acc += curr), 0);

    const totalRemainingHours = hours.reduce((acc, curr) => (acc += curr), 0);

    expandedColumnHours = `R: ${weekHours.toFixed(2)}h + ${(
      totalRemainingHours - weekHours
    ).toFixed(2)}h`;
  }

  const sumLabel = expandedColumnHours.length
    ? expandedColumnHours
    : 'R: ' + hours.reduce((acc, curr) => (acc += curr), 0).toFixed(2) + 'h';
  return sumLabel;
};
