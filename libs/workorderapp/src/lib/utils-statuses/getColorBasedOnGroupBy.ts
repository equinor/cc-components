import { proCoSysWorkOrderColorMap } from '@cc-components/shared';
import { followUpColorMap } from './followup';

export const getColorBasedOnGroupBy = (
  groupBy: string
): typeof proCoSysWorkOrderColorMap | typeof followUpColorMap =>
  groupBy === 'wp' ? proCoSysWorkOrderColorMap : followUpColorMap;
