import { MaterialStatus } from '../../../types/src/lib/materialStatus';

/**
 * Dictionary for mapping material statuses to readable string.
 */
export const materialStatusMap: Partial<Record<MaterialStatus, string>> = {
  M10: 'Material requested to job site',
  M12: 'Material received on job site',
  M02: 'Materials linked to Smartpack/Jobcard',
  M06: 'Material partly delivered',
  M07: 'Materials fully delivered',
  M09: 'Material returned',
  MN: 'No Material required',
  MN01: 'Additional material to be issued Offshore from Min/Max Stock',
  MNX1: 'Materials not linked to Smartpack/Jobcard',
  MNX2: 'Materials partially linked to Smartpack/Jobcard',
};
