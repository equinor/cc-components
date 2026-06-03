import { hasProperty, statusColorMap } from '@cc-components/shared';

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
