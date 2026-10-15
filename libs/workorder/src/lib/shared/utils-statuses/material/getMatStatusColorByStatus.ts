import { hasProperty, statusColorMap } from '@cc-components/shared';
import { materialColorMap, materialPackageStatusMap } from './material';

export const getMatStatusColorByStatus = (matStatus: string | null): string => {
  if (!matStatus) {
    return statusColorMap.OS;
  }
  if (hasProperty(materialPackageStatusMap, matStatus)) {
    const mappedMatStatus = materialPackageStatusMap[matStatus];
    return mappedMatStatus ? materialColorMap[mappedMatStatus] : statusColorMap.OS;
  } else {
    return statusColorMap.OS;
  }
};
