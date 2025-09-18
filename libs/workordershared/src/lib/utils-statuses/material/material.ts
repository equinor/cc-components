import { statusColorMap, MaterialStatus } from '@cc-components/shared';
import { MappedMaterialStatus } from '../../types';

export const materialColorMap: Record<MappedMaterialStatus, string> = {
  OK: statusColorMap.OK,
  AVAILABLE: statusColorMap.PB,
  NOT_AVAILABLE: statusColorMap.PA,
};
export const materialPackageStatusMap: Partial<
  Record<MaterialStatus, MappedMaterialStatus>
> = {
  M02: 'NOT_AVAILABLE',
  M03: 'NOT_AVAILABLE',
  M04: 'NOT_AVAILABLE',
  M05: 'NOT_AVAILABLE',
  M06: 'NOT_AVAILABLE',
  M07: 'AVAILABLE',
  M09: 'AVAILABLE',
  M10: 'AVAILABLE',
  M11: 'AVAILABLE',
  M12: 'OK',
  MN: 'OK',
};
