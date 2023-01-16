import { getYearAndWeekFromDate } from '@cc-components/shared';
import { SwcrPackage } from '@cc-components/swcrshared';
import { DateTime } from 'luxon';
import { DATE_BLANKSTRING } from '../constants/dateBlankString';
import { GetKeyFunction } from '../types/getKeyFunction';

export const getRfccDueDateKey: GetKeyFunction<SwcrPackage> = (item) => {
  const dueDate = new Date(item.dueAtDate);
  const startDate = new Date(item.cpkgStartForecastAtDate || item.cpkgStartPlannedAtDate);

  let groupByKey = DATE_BLANKSTRING;
  if (DateTime.fromJSDate(dueDate).isValid && DateTime.fromJSDate(startDate).isValid) {
    const date = dueDate > startDate ? dueDate : startDate;
    groupByKey = getYearAndWeekFromDate(new Date(date.setDate(date.getDate() - 56)));
  } else if (DateTime.fromJSDate(dueDate).isValid)
    groupByKey = getYearAndWeekFromDate(
      new Date(dueDate.setDate(dueDate.getDate() - 56))
    );
  else if (DateTime.fromJSDate(startDate).isValid)
    groupByKey = getYearAndWeekFromDate(
      new Date(startDate.setDate(startDate.getDate() - 56))
    );

  return [groupByKey];
};
