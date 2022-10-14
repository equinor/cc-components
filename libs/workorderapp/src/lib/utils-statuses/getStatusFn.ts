import { ExtendedGardenFields, WorkOrder } from '../types';
import { getFollowUpStatus } from './getFollowUpStatus';
import { getWoStatus } from './getWoStatus';

/**
 * Function that returns another function, depending on what is currently grouped, which retrieves the package's status.
 * Workorder packages can have different logic for retrieving status based on how the packages are grouped.
 * "wp" will return a different status function that the rest of the grouping options.
 */
export const getStatusFn = (groupBy: keyof WorkOrder | ExtendedGardenFields) =>
  groupBy === 'wp' ? getWoStatus : getFollowUpStatus;
