import { Pipetest } from 'libs/pipingshared/dist/src';
import { pipetestStatusColormap } from '@cc-components/shared/mapping';
import { getTextColor } from './getTextColor';
import { BaseStatus } from 'libs/shared/dist/src/packages';

type PackageStatusReturn = {
  backgroundColor: string;
  textColor: string;
};

export const getPipetestStatusColors = (data: Pipetest): PackageStatusReturn => {
  const backgroundColor = pipetestStatusColormap[data.formStatus as BaseStatus];
  const textColor = getTextColor(data.formStatus || '');
  return { backgroundColor, textColor };
};
