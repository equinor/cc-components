import { HandoverPackage } from '@cc-components/handovershared';
import { getMaxVolumeFromData } from '../utils-garden';

export const contextConfig = (data: HandoverPackage[]) => ({
  maxVolume: getMaxVolumeFromData(data),
});
