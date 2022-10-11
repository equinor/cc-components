import { colorMap, PackageStatus } from '@cc-components/shared';
import { HandoverPackage } from '../types';
import { getStatus } from './getStatus';

type McProgress = {
  color: (item: HandoverPackage) => string;
  accessor: (item: HandoverPackage) => number;
};

const mcProgressMap: McProgress[] = [
  {
    color: () => '#d9eaf2',
    accessor: (item) => item.mcPkgsCount,
  }, // OS
  {
    color: (item) =>
      item.rfccIsRejected ? colorMap[getStatus(item)] : colorMap['RFCC Sent'],
    accessor: (item) => item.mcPkgsRFCCShippedCount,
  },
  {
    color: (item) => {
      const status = getStatus(item);
      if (status.indexOf('TAC') > -1) return colorMap[status];
      return item.rfccIsRejected ? colorMap[status] : '#7cb342';
    },
    accessor: (item) => item.mcPkgsRFCCSigned,
  },
  {
    color: (item) =>
      item.rfocIsRejected ? colorMap[getStatus(item)] : colorMap['RFOC Sent'],
    accessor: (item) => item.mcPkgsRFOCShipped,
  },
  {
    color: (item) => (item.rfocIsRejected ? colorMap[getStatus(item)] : '#0035bc'),
    accessor: (item) => item.mcPkgsRFOCSigned,
  },
];
const mcProgressPercentage = (
  item: HandoverPackage,
  accessor: (item: HandoverPackage) => number
): number => {
  const count = accessor(item);
  return count < 1 ? 0 : item.mcPkgsCount === 0 ? 0 : (count / item.mcPkgsCount) * 100;
};

export const createProgressGradient = (
  data: HandoverPackage,
  status: PackageStatus = getStatus(data)
): string => {
  const color = colorMap[status];
  let progressWidth = 0;
  let progressColor = '';

  const renderMcProgress = (item: HandoverPackage, mcProgress: McProgress) => {
    const width = mcProgressPercentage(item, mcProgress.accessor);
    if (width === 0) return;
    progressWidth = Math.floor(width);
    progressColor = mcProgress.color(item);
  };

  mcProgressMap.forEach((mcProgress) => renderMcProgress(data, mcProgress));

  return progressWidth === 100 || progressWidth === 0
    ? color
    : `linear-gradient(90deg,${progressColor} ${progressWidth}%,${color} ${progressWidth}%)`;
};
