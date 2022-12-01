import { GardenGroup } from '@equinor/workspace-fusion/garden';
import { SwcrPackage } from '@cc-components/swcrshared';
import { DATE_BLANKSTRING } from '../constants/dateBlankString';
import { DEFAULT_BLANKSTRING } from '../constants/defaultBlankString';

export const getMinorTitle = (
  groupKey: string,
  column: GardenGroup<SwcrPackage>
): string => {
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

export const getTitle = (groupKey: string, column: GardenGroup<SwcrPackage>): string => {
  switch (groupKey) {
    case 'dueAtDate': {
      if (column.value === 'N/A') return column.value;

      return 'W' + column.value.split('-')[1]?.padStart(2, '0') || '';
    }
    default:
      return column.value;
  }
};
