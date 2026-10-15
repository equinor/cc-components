import { hasProperty } from '@cc-components/shared';
import { WorkOrder, materialPackageStatusMap } from '../../shared';
import { MappedMaterialStatus } from '../../shared';

const DEFAULT_MAT_STATUS = materialPackageStatusMap.M04 as MappedMaterialStatus;
export const getMatStatus = (workOrder: WorkOrder): MappedMaterialStatus => {
  if (!workOrder.materialStatus) {
    return DEFAULT_MAT_STATUS;
  }
  if (hasProperty(materialPackageStatusMap, workOrder.materialStatus)) {
    return materialPackageStatusMap[workOrder.materialStatus] || DEFAULT_MAT_STATUS;
  } else return DEFAULT_MAT_STATUS;
};
