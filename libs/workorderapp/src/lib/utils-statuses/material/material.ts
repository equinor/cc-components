import { MaterialStatus, statusColorMap } from '@cc-components/shared';
import { MappedMaterialStatus } from '../../types';

export const materialColorMap: Record<MappedMaterialStatus, string> = {
  OK: statusColorMap.OK,
  AVAILABLE: statusColorMap.PA,
  NOT_AVAILABLE: statusColorMap.PB,
};
export const materialPackageStatusMap: Partial<
  Record<MaterialStatus, MappedMaterialStatus>
> = {
  MN: 'OK',
  M10: 'OK',
  M11: 'OK',
  M12: 'OK',
  M5: 'AVAILABLE',
  M6: 'AVAILABLE',
  M7: 'AVAILABLE',
  M9: 'AVAILABLE',
  M2: 'NOT_AVAILABLE',
  M3: 'NOT_AVAILABLE',
  M4: 'NOT_AVAILABLE',
};
