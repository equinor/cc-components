import { statusColorMap } from '@cc-components/shared/mapping';
import { hasProperty } from '@cc-components/shared/utils-typescript';
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
