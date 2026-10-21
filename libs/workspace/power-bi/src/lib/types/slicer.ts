import { models, VisualDescriptor } from 'powerbi-client';

export type SlicerData = {
  data: string;
  target: models.IFilterGeneralTarget | undefined;
  slicer: VisualDescriptor;
};

export type SlicerFilter = models.ISlicerFilter & {
  values?: (string | number | boolean)[];
};
