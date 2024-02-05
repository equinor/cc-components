import { Pipetest } from '@cc-components/pipingshared';
import { pipetestStatusColormap } from '@cc-components/shared/mapping';
import { BaseStatus } from 'libs/shared/dist/src/packages';

type PackageStatusReturn = {
  backgroundColor: string;
};

export const getPipetestStatusColors = (data: Pipetest): PackageStatusReturn => {
  const backgroundColor = pipetestStatusColormap[data.formStatus as BaseStatus];
  return { backgroundColor };
};
