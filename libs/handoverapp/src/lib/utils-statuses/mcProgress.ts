import { HandoverPackage } from '@cc-components/handovershared';
import { colorMap } from '@cc-components/shared/mapping';
import { PackageStatus } from '@cc-components/shared/types';

type McProgress = {
  color: (item: HandoverPackage) => string;
  accessor: (item: HandoverPackage) => number;
};

const mcProgressMap: McProgress[] = [
  {
    color: () => '#d9eaf2',
    accessor: (item) => item.mechanicalCompletionPkgsCount,
  }, // OS
  {
    color: (item) =>
      item.isRfcRejected
        ? colorMap[item.commissioningPackageStatus]
        : colorMap['RFC Sent'],
    accessor: (item) => item.mechanicalCompletionPkgsRfccShippedCount,
  },
  {
    color: (item) => {
      if (status.indexOf('TAC') > -1) return colorMap[item.commissioningPackageStatus];
      return item.isRfcRejected ? colorMap[item.commissioningPackageStatus] : '#7cb342';
    },
    accessor: (item) => item.mechanicalCompletionPkgsRfccSignedCount,
  },
  {
    color: (item) =>
      item.isRfoRejected
        ? colorMap[item.commissioningPackageStatus]
        : colorMap['RFO Sent'],
    accessor: (item) => item.mechanicalCompletionPkgsRfocShippedCount,
  },
  {
    color: (item) =>
      item.isRfoRejected ? colorMap[item.commissioningPackageStatus] : '#0035bc',
    accessor: (item) => item.mechanicalCompletionPkgsRfocSignedCount,
  },
];
const mcProgressPercentage = (
  item: HandoverPackage,
  accessor: (item: HandoverPackage) => number
): number => {
  const count = accessor(item);
  return count < 1
    ? 0
    : item.mechanicalCompletionPkgsCount === 0
    ? 0
    : (count / item.mechanicalCompletionPkgsCount) * 100;
};

export const createProgressGradient = (
  data: HandoverPackage,
  status: PackageStatus = data.dynamicCommissioningStatus
): string => {
  const color = colorMap[status];
  let progressWidth = 0;
  let progressColor = '';

  const renderMcProgress = (item: HandoverPackage, mcProgress: McProgress) => {
    const width = mcProgressPercentage(item, mcProgress.accessor);
    if (width === 0) return;
    progressWidth = Math.floor(width);
    progressColor = colorMap[status];
  };

  mcProgressMap.forEach((mcProgress) => renderMcProgress(data, mcProgress));

  return progressWidth === 100 || progressWidth === 0
    ? color
    : `linear-gradient(90deg,${
        colorMap[data.commissioningPackageStatus]
      } ${progressWidth}%,#d9eaf2 ${progressWidth}%)`;
};
