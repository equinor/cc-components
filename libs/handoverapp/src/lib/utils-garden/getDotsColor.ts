import { colorMap } from '@cc-components/shared/mapping';
import { BaseStatus, PackageStatus } from '@cc-components/shared/types';

export const dotsColorMap: Record<Extract<BaseStatus, 'OS'>, string> = {
  OS: '#9E9E9E',
};
export const getDotsColor = (status: PackageStatus) => {
  switch (status) {
    case 'OS':
      return dotsColorMap.OS;
    case 'PA':
      return colorMap.PA;
    case 'PB':
      return colorMap.PB;
    default:
      return colorMap.OK;
  }
};
