/* eslint-disable @typescript-eslint/no-unused-vars */
import { DATE_BLANKSTRING } from '../constants/dateBlankString';
import { DEFAULT_BLANKSTRING } from '../constants/defaultBlankString';
import { SwcrPackage } from '../types';
//TODO: import Dataset from Garden
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataSet<T> = any;
export const getMinorTitle = (groupKey: string, column: DataSet<SwcrPackage>): string => {
  if (column.value === DEFAULT_BLANKSTRING || column.value === DATE_BLANKSTRING)
    return '';

  switch (groupKey) {
    case 'RFCC':
    case 'RFCCDueDate':
    case 'startImplForecast':
    case 'RFOC':
    case 'closedAtDate':
    case 'dueAtDate': {
      return column.value.split('-')[0] || '';
    }
    default:
      return '';
  }
};

export const getTitle = (groupKey: string, column: DataSet<SwcrPackage>): string => {
  switch (groupKey) {
    case 'dueAtDate': {
      if (column.value === 'No Date') return column.value;

      return 'W' + column.value.split('-')[1]?.padStart(2, '0') || '';
    }
    default:
      return column.value;
  }
};
