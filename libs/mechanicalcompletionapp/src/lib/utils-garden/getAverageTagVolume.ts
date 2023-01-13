import { McPackage } from '@cc-components/mechanicalcompletionshared';

export const getAverageTagVolume = (mcPackages: McPackage[]): number => {
  const avgTagVol = mcPackages
    .map((mcPackage) => parseInt(mcPackage.tagVolume || '0'), 10)
    .sort((a, b) => a - b);

  avgTagVol.pop();
  avgTagVol.shift();
  const avg = avgTagVol.reduce((a, b) => a + b, 0) / avgTagVol.length;
  return avg * 2;
};
