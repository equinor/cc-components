import { Punch } from '@cc-components/punchshared';
import { FieldSettings } from '@equinor/workspace-fusion/garden';
import { ExtendedGardenFields } from '../types';
import { sortByDate } from '../utils-keys/sortByDate';
import { getDateKey } from './getDateKey';

export const fieldSettings: FieldSettings<Punch, ExtendedGardenFields> = {
  handoverPlan: {
    label: 'Handover plan',
    getKey: (item) => getDateKey(item.handoverPlan),
    getColumnSort: sortByDate,
  },
  rfcPlannedForecastDate: {
    label: 'RFC plan',
    getKey: (item) => getDateKey(item.rfcPlannedForecastDate),
    getColumnSort: sortByDate,
  },
  rfoPlannedForecastDate: {
    label: 'RFO plan',
    getKey: (item) => getDateKey(item.rfoPlannedForecastDate),
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
  clearedBy: {
    label: 'Clearing by',
  },
  commissioningPackageNo: {
    label: 'Commpkg',
  },
  system: {
    label: 'System',
  },
};
