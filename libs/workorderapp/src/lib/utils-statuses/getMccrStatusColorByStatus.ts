import { statusColorMap } from '@cc-components/shared/mapping';
import { hasProperty } from '@cc-components/shared/utils-typescript';

export const getMccrStatusColorByStatus = (mccrStatus: string | null): string => {
  if (!mccrStatus) {
    return statusColorMap.OS;
  }
  if (hasProperty(statusColorMap, mccrStatus)) {
    return statusColorMap[mccrStatus];
  } else {
    return statusColorMap.OS;
  }
};
