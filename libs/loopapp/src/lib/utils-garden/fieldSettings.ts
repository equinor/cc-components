import { FieldSettings, sortByNumber } from '@cc-components/shared';
import { CustomGroupByKeys, ExtendedGardenFields, Loop } from '../types';
import { getDateKey } from './getGroupByKey';

export const fieldSettings: FieldSettings<Loop, ExtendedGardenFields, CustomGroupByKeys> =
  {
    responsible: {
      label: 'Reponsible',
    },
    functionalSystem: {
      label: 'Functional system',
    },
    commissioningPackageNo: {
      label: 'Comm pkg',
    },
    mechanicalCompletionPackageNo: {
      label: 'MC pkg',
    },
    priority1: {
      label: 'Priority',
    },
    MCComplete: {
      label: 'Planned MC complete',
      getKey: getDateKey,
      getColumnSort: sortByNumber,
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
    loopNo: {
      label: '@LOOP tag',
    },
  };
