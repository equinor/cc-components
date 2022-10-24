import { FieldSettings, sortByNumber } from '@cc-components/shared';
import { ExtendedGardenFields, WorkOrder } from '../types';
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
