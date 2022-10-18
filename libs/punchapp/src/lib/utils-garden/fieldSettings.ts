import { FieldSettings, sortByNumber } from '@cc-components/shared';
import { ExtendedGardenFields, Punch } from '../types';
import { getDateKey } from './getDateKey';

export const fieldSettings: FieldSettings<Punch, ExtendedGardenFields> = {
  responsible: {
    label: 'Responsible',
  },
  functionalSystem: {
    label: 'System',
  },
  formularType: {
    label: 'Form type',
  },
  RFC: {
    label: 'RFC',
    getKey: getDateKey,
    getColumnSort: sortByNumber,
  },
  RFO: {
    label: 'RFO',
    getKey: getDateKey,
    getColumnSort: sortByNumber,
  },
  punchListSorting: {
    label: 'PL Sorting',
  },
  punchListType: {
    label: 'PL Type',
  },
};
