import { HTMLAttributes, useMemo } from 'react';
import { toDate } from '../../../utils-dates/toDate';

type YearAndWeekCellProps<T extends string | null> = {
  dateString: T;
  cellAttributeFunction?: (content: T) => HTMLAttributes<HTMLElement>;
};
export const YearAndWeekCell = <T extends string | null>({
  dateString,
  cellAttributeFunction,
}: YearAndWeekCellProps<T>) => {
  const dateOrUndefined = toDate(dateString);
  const dateDisplay = dateOrUndefined
    ? `${dateOrUndefined.year}-${
        dateOrUndefined.weekNumber < 10
          ? '0' + dateOrUndefined.weekNumber
          : dateOrUndefined.weekNumber
      }`
    : '';
  const attr = useMemo(
    () => (cellAttributeFunction ? cellAttributeFunction(dateString) : undefined),
    [cellAttributeFunction, dateString]
  );

  return <div {...attr}>{dateDisplay}</div>;
};
