import { HandoverPackage } from '../types';
import { getMaxVolumeFromData } from '../utils-garden';

export const contextConfig = (data: HandoverPackage[]) => ({
  maxVolume: getMaxVolumeFromData(data),
});
