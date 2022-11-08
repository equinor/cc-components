import { hasProperty, statusColorMap } from '@cc-components/shared';

export const getMccrStatusColorByStatus = (mccrStatus: string): string => {
  if (hasProperty(statusColorMap, mccrStatus)) {
    return statusColorMap[mccrStatus];
  } else {
    return statusColorMap.OS;
  }
};
