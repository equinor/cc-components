import { McPackage } from '@cc-components/mechanicalcompletionshared';
import { TagSize } from '../types';

export const getTagSize = (mcPackage: McPackage, averageTagVolume: number): TagSize => {
  let size: TagSize = 'small';
  if (averageTagVolume > 0) {
    const percentage = ((mcPackage.tagVolume || 0) / averageTagVolume) * 100;
    size = percentage > 66 ? 'large' : percentage > 33 ? 'medium' : 'small';
  }
  return size;
};
