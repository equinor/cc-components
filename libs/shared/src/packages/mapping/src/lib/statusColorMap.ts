import { BaseStatus } from '../../../types/src/lib/baseStatus';

/**
 * Dictionary for mapping the base statuses (OS, OK, PA, PB) to colors.
 */
export const statusColorMap: Record<BaseStatus, string> = {
  OS: '#9e9e9e',
  PB: '#ffc107',
  PA: '#ff4081',
  OK: '#00c853',
} as const;

export const pipetestStatusColormap = { ...statusColorMap, IN: 'red' } as const;
