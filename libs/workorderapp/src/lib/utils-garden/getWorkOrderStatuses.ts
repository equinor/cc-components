import { FollowUpStatuses, ProcosysStatuses, hasProperty } from '@cc-components/shared';
import { WorkOrder } from '@cc-components/workordershared';
import { ExtendedGardenFields } from '../types';
import {
  getColorBasedOnGroupBy,
  getMatStatus,
  getMatStatusColorByStatus,
  getMccrStatusColorByStatus,
  getStatusFn,
  getTextColorByStatus,
} from '../utils-statuses';
import { getItemSize } from './getItemSize';

type PackageStatusReturn = {
  mccrColor: string;
  matColor: string;
  matStatus: string;
  backgroundColor: string;
  textColor: string;
  size: 'small' | 'medium' | 'large';
  progressBar: string;
  status: ProcosysStatuses | FollowUpStatuses;
};
export const getWorkOrderStatuses = (
  data: WorkOrder,
  gardenKey: keyof WorkOrder | ExtendedGardenFields,
  groupByKeys: (keyof WorkOrder | ExtendedGardenFields)[]
): PackageStatusReturn => {
  const mccrColor = getMccrStatusColorByStatus(data.mccrStatus);
  const matColor = getMatStatusColorByStatus(data.materialStatus);
  const matStatus: string = getMatStatus(data);
  const statusMap = getStatusFn(groupByKeys[0] || gardenKey);
  const colorMap = getColorBasedOnGroupBy(groupByKeys[0] || gardenKey);
  const status = statusMap(data);
  //TODO: default color?
  const backgroundColor = hasProperty(colorMap, status) ? colorMap[status] : 'black';
  const textColor = getTextColorByStatus(status);
  const size = getItemSize(Number(data?.estimatedHours ?? 0));
  const progressBar = `linear-gradient(90deg, #706b6b ${parseInt(
    data?.projectProgress ?? '0',
    10
  )}%, transparent ${parseInt(data?.projectProgress ?? '0', 10)}%)`;
  return {
    mccrColor,
    matColor,
    matStatus,
    backgroundColor,
    textColor,
    size,
    progressBar,
    status,
  };
};
