import { McPackage } from '../types';
import { getAverageTagVolume } from '../utils-garden/getAverageTagVolume';

export const contextConfig = (data: McPackage[]) => ({
  averageTagVolume: getAverageTagVolume(data),
});
