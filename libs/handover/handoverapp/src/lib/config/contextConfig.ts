import { HandoverPackage } from '@cc-components/handover/shared';
import { getMaxVolumeFromData } from '../utils-garden';

export const contextConfig = (data: HandoverPackage[]) => ({
  maxVolume: getMaxVolumeFromData(data),
});
