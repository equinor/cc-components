import { sortByNumber } from '@cc-components/shared/utils-sorting';
import { WorkOrder } from '@cc-components/workordershared';
import { FieldSettings } from '@equinor/workspace-fusion/garden';
import { ExtendedGardenFields } from '../types';
import { columnKeyAccessor } from './columnKeyAccessor';

export const fieldSettings: FieldSettings<WorkOrder, ExtendedGardenFields> = {
  wp: {
    label: 'Workorder production',
    getKey: columnKeyAccessor,
    getColumnSort: sortByNumber,
  },
  hwp: {
    label: 'Hours ready for execution at site',
    getKey: columnKeyAccessor,
    getColumnSort: sortByNumber,
  },
  fwp: {
    label: 'Finalizing of workorder at site',
    getKey: columnKeyAccessor,
    getColumnSort: sortByNumber,
  },
  responsibleCode: {
    label: 'Responsible',
  },
  disciplineCode: {
    label: 'Discipline',
  },
  milestone: {
    label: 'Milestone',
  },
};
