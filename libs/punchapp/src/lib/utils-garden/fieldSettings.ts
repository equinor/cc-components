import { sortByNumber } from '@cc-components/shared';
import { FieldSettings } from '@equinor/workspace-fusion/garden';
import { CustomGroupByKeys, ExtendedGardenFields, Punch } from '../types';
import { getDateKey } from './getDateKey';

export const fieldSettings: FieldSettings<
  Punch,
  ExtendedGardenFields,
  CustomGroupByKeys
> = {
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
  verifiedAtDate: {
    label: 'Verified',
    getKey: getDateKey,
    getColumnSort: sortByNumber,
  },
  clearedAtDate: {
    label: 'Cleared',
    getKey: getDateKey,
    getColumnSort: sortByNumber,
  },
  clearingByOrganization: {
    label: 'Clearing by',
  },
  materialRequired: {
    label: 'Material required',
    getKey: (item, itemKey, d) => {
      return item.materialRequired === null
        ? '(Blank)'
        : item.materialRequired === false
        ? 'False'
        : 'True';
    },
  },
  commissioningPackageNo: {
    label: 'Compack',
  },
  functionalSystem: {
    label: 'System',
  },
};
