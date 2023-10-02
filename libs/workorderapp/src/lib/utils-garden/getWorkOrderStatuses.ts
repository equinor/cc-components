import { FollowUpStatuses, ProcosysStatuses, hasProperty } from '@cc-components/shared';
import {
  WorkOrder,
  getMatStatusColorByStatus,
  getMccrStatusColorByStatus,
} from '@cc-components/workordershared';
import {
  getColorBasedOnGroupBy,
  getMatStatus,
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
  gardenKey: string,
  groupByKeys: string[]
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
  const progressBar = `linear-gradient(90deg, #706b6b ${data?.projectProgress}%, transparent ${data?.projectProgress}%)`;
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
