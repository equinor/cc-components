import { BaseStatus } from '@cc-components/shared/types';

/**
 * Dictionary for mapping the base statuses (OS, OK, PA, PB) to colors.
 */
export const statusColorMap: Record<BaseStatus, string> = {
  OS: '#9e9e9e',
  PB: '#ffc107',
  PA: '#ff4081',
  OK: '#00c853',
};
