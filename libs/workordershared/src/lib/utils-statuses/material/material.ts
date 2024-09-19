import { statusColorMap, MaterialStatus } from '@cc-components/shared';
import { MappedMaterialStatus } from '../../types';

export const materialColorMap: Record<MappedMaterialStatus, string> = {
  OK: statusColorMap.OK,
  AVAILABLE: statusColorMap.PA,
  NOT_AVAILABLE: statusColorMap.PB,
};
export const materialPackageStatusMap: Partial<
  Record<MaterialStatus, MappedMaterialStatus>
  > = {
    M02: 'NOT_AVAILABLE',
    M03: 'NOT_AVAILABLE',
    M04: 'NOT_AVAILABLE',
    M05: 'AVAILABLE',
    M06: 'AVAILABLE',
    M07: 'AVAILABLE',
    M09: 'AVAILABLE',
    M10: 'OK',
    M11: 'OK',
    M12: 'OK',
    MN: 'OK',
};
