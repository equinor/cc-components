import { colorMap } from '@cc-components/shared/mapping';
import { BaseStatus } from '@cc-components/shared/types';

export const dotsColorMap: Record<Extract<BaseStatus, 'OS'>, string> = {
  OS: '#9E9E9E',
};
export const getDotsColor = (status: BaseStatus) => {
  return colorMap[status] || colorMap.OK;
};
