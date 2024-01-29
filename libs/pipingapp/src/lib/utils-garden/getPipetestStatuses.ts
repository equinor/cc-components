import { Pipetest } from 'libs/pipingshared/dist/src';
import { pipetestStatusColormap } from '@cc-components/shared/mapping';
import { getTextColor } from './getTextColor';


type PackageStatusReturn = {
  backgroundColor: string;
  textColor: string;
};

export const getHeatTraceStatuses = (data: Pipetest): PackageStatusReturn => {
  //bconst backgroundColor = pipetestStatusColormap[data.checklistStep || ''];
  // const textColor = getTextColor(data.checklistStep || '');

  return { backgroundColor: 'green', textColor: 'black' };
};
