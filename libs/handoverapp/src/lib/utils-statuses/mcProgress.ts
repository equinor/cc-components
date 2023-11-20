import { HandoverPackage } from '@cc-components/handovershared';
import { colorMap } from '@cc-components/shared/mapping';
import { PackageStatus } from '@cc-components/shared/types';

type McProgress = {
  color: (item: HandoverPackage) => string;
  accessor: (item: HandoverPackage) => number;
};

const mcProgressMap: McProgress[] = [
  {
    color: () => colorMap['RFO Accepted'],
    accessor: (item) => item.mechanicalCompletionPkgsRfocSignedCount,
  },
  {
    color: () => colorMap['RFO Sent'],
    accessor: (item) => item.mechanicalCompletionPkgsRfocShippedCount,
  },
  {
    color: () => colorMap['RFC Accepted'],
    accessor: (item) => item.mechanicalCompletionPkgsRfccSignedCount,
  },
  {
    color: () => colorMap['RFC Sent'],
    accessor: (item) => item.mechanicalCompletionPkgsRfccShippedCount,
  },
  {
    color: () => '#d9eaf2',
    accessor: (item) => item.mechanicalCompletionPkgsCount,
  },
];

const calculateProgressPercentage = (
  item: HandoverPackage,
  accessor: (item: HandoverPackage) => number
): number => {
  const count = accessor(item);
  return count < 1 || item.mechanicalCompletionPkgsCount === 0
    ? 0
    : (count / item.mechanicalCompletionPkgsCount) * 100;
};

export const createProgressGradient = (
  item: HandoverPackage,
  status: PackageStatus = item.dynamicCommissioningStatus
): string => {
  let gradientSegments: string[] = [];

  mcProgressMap.forEach((mcProgress) => {
    const width = calculateProgressPercentage(item, mcProgress.accessor);
    gradientSegments.push(`${mcProgress.color(item)} 0% ${width}%`);
  });

  return `linear-gradient(90deg, ${gradientSegments.join(', ')})`;
};
