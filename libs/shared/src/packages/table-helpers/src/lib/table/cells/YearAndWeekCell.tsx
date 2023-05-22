import { HTMLAttributes, useMemo } from 'react';
import { toDate } from '../../../../../utils-dates/src/lib/utils-dates/toDate';

type YearAndWeekCellProps<T extends string | null> = {
  dateString: T;
  cellAttributeFunction?: (content: T) => HTMLAttributes<HTMLElement>;
};
/**
 * Standard component for displaying year and week in a table cell.
 */
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

  return (
    <div style={{ fontVariantNumeric: 'tabular-nums' }} {...attr}>
      {dateDisplay}
    </div>
  );
};
