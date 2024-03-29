import { getWoStatus } from '@cc-components/workordershared';
import { getFollowUpStatus } from './followup';

/**
 * Function that returns another function, depending on what is currently grouped, which retrieves the package's status.
 * Workorder packages can have different logic for retrieving status based on how the packages are grouped.
 * "wp" will return a different status function that the rest of the grouping options.
 */
export const getStatusFn = (
  groupBy: string
): typeof getWoStatus | typeof getFollowUpStatus =>
  groupBy === 'WorkorderProduction' ? getWoStatus : getFollowUpStatus;
