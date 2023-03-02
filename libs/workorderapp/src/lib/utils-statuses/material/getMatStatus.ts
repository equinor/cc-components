import { hasProperty } from '@cc-components/shared/utils-typescript';
import { WorkOrder } from '@cc-components/workordershared';
import { MappedMaterialStatus } from '../../types';
import { materialPackageStatusMap } from './material';
const DEFAULT_MAT_STATUS = materialPackageStatusMap.M4 as MappedMaterialStatus;
export const getMatStatus = (workOrder: WorkOrder): MappedMaterialStatus => {
  if (!workOrder.materialStatus) {
    return DEFAULT_MAT_STATUS;
  }
  if (hasProperty(materialPackageStatusMap, workOrder.materialStatus)) {
    return materialPackageStatusMap[workOrder.materialStatus] || DEFAULT_MAT_STATUS;
  } else return DEFAULT_MAT_STATUS;
};
