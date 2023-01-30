import { FieldSettings } from '@equinor/workspace-fusion/garden';
import { ExtendedGardenFields, Punch } from '../types';
import { CustomGroupByKeys } from '../types/customGroupByKeys';
import { sortByDate } from '../utils-keys/sortByDate';
import { getDateKey } from './getDateKey';

export const fieldSettings: FieldSettings<Punch, ExtendedGardenFields, CustomGroupByKeys> = {
  handoverPlan: {
      label: 'Handover plan',
      getKey: (item) => getDateKey(item.handoverPlan),
      getColumnSort: sortByDate,
  },
  rfC_PlannedForecastDate: {
      label: 'RFC plan',
      getKey: (item) => getDateKey(item.rfC_PlannedForecastDate),
      getColumnSort: sortByDate,
  },
  rfO_PlannedForecastDate: {
      label: 'RFO plan',
      getKey: (item) => getDateKey(item.rfO_PlannedForecastDate),
      getColumnSort: sortByDate,
  },
  dueDate: {
      label: 'Due date',
      getKey: (item) => getDateKey(item.dueDate),
      getColumnSort: sortByDate,
  },
  createdDate: {
      label: 'Created date',
      getKey: (item) => getDateKey(item.createdDate),
      getColumnSort: sortByDate,
  },
  clearedAtDate: {
      label: 'Cleared date',
      getKey: (item) => getDateKey(item.clearedAtDate),
      getColumnSort: sortByDate,
  },
  verifiedAtDate: {
      label: 'Verified date',
      getKey: (item) => getDateKey(item.verifiedAtDate),
      getColumnSort: sortByDate,
  },
  cleardBy: {
      label: 'Clearing by',
  },
  commissioningPackageNo: {
      label: 'Commpkg',
  },
  system: {
      label: 'System',
  },
};
