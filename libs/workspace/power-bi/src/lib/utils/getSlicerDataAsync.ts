import { SlicerData } from '../types';
import { models, VisualDescriptor } from 'powerbi-client';

export const getSlicerDataAsync = async (slicer: VisualDescriptor): Promise<SlicerData> => {
  const { data } = await slicer.exportData();
  const target = await getSlicerTarget(slicer);

  return { data, target, slicer };
};

/**
 * Prefer the slicer's own field from getSlicerState().targets.
 * getFilters() returns visual-level filters, which may be missing or target another column.
 */
const getSlicerTarget = async (
  slicer: VisualDescriptor
): Promise<models.IFilterGeneralTarget | undefined> => {
  const state = await slicer.getSlicerState().catch(() => undefined);
  const stateTarget = state?.targets?.[0];
  if (stateTarget) return stateTarget as models.IFilterGeneralTarget;

  const filters = await slicer.getFilters().catch(() => []);
  return filters[0]?.target as models.IFilterGeneralTarget | undefined;
};
