import { Pipetest } from '@cc-components/pipingshared';
import { pipetestAndHeatTraceColorMap } from '@cc-components/shared/mapping';
import { getTextColor } from './getTextColor';

type PackageStatusReturn = {
  backgroundColor: string;
  textColor: string;
};

export const getPipetestStatusColors = (data: Pipetest): PackageStatusReturn => {
  const backgroundColor = pipetestAndHeatTraceColorMap[data.checklistStep || ''];
  const textColor = getTextColor(data.checklistStep || '');

  return { backgroundColor: backgroundColor, textColor: textColor };
};
