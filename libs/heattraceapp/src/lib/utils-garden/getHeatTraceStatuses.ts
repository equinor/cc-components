import { HeatTrace } from '@cc-components/heattraceshared';
import { pipetestAndHeatTraceColorMap } from '@cc-components/shared/mapping';
import { getTextColor } from './getTextColor';

type PackageStatusReturn = {
  backgroundColor: string;
  textColor: string;
};

export const getHeatTraceStatuses = (data: HeatTrace): PackageStatusReturn => {
  const backgroundColor = pipetestAndHeatTraceColorMap[data.checklistStep || ''];
  const textColor = getTextColor(data.checklistStep || '');

  return { backgroundColor: backgroundColor, textColor: textColor };
};
