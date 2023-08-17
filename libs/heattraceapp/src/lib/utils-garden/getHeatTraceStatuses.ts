import { HeatTrace } from 'libs/heattraceshared/dist/src';
import { pipetestAndHeatTraceColorMap } from '@cc-components/shared';
import { getTextColor } from './getTextColor';

type PackageStatusReturn = {
  backgroundColor: string;
  textColor: string;
};

export const getHeatTraceStatuses = (data: HeatTrace): PackageStatusReturn => {
  // const backgroundColor = pipetestAndHeatTraceColorMap[data.currentStep];
  // const textColor = getTextColor(data.currentStep);

  return { backgroundColor: 'green', textColor: 'white' };
};
