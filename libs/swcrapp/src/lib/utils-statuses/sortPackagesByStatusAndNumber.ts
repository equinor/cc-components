import { SoftwareChangeRecord, SwcrStatus } from '@cc-components/swcrshared';
import { getSwcrStatusPriority } from './getSwcrStatusPriority';

export const sortPackagesByStatusAndNumber = (
  columnA: SoftwareChangeRecord,
  columnB: SoftwareChangeRecord
): number =>
  getSwcrStatusPriority(columnA.status as SwcrStatus) -
    getSwcrStatusPriority(columnB.status as SwcrStatus) ||
  parseInt(columnA.softwareChangeRecordNo) - parseInt(columnB.softwareChangeRecordNo);
