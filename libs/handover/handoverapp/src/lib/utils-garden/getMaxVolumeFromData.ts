import { HandoverPackage } from '@cc-components/handover/shared';

export const getMaxVolumeFromData = (data: HandoverPackage[]): number => {
  const volumes = data.map((d) => d.volume).sort((a, b) => a - b);

  volumes.pop();
  volumes.shift();
  return (volumes.reduce((a, b) => a + b, 0) / volumes.length) * 2;
};
