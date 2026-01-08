import { models, VisualDescriptor } from 'powerbi-client';

export type ActiveFilter = string | number | boolean | null;

export interface PowerBiFilterItem {
  type: string;
  value: string | undefined | null;
  slicerName: string;
  target: models.IFilterGeneralTarget | undefined;
}

export interface PowerBiFilter {
  type: string;
  slicer: VisualDescriptor;
  sortOrder: number;
  value: Record<string, PowerBiFilterItem>;
  filterVals: string[];
}
