import { HandoverPackage } from '@cc-components/handovershared';
import { colorMap } from '@cc-components/shared/mapping';
import { PackageStatus } from '@cc-components/shared/types';

type McProgress = {
  color: (item: HandoverPackage) => string;
  accessor: (item: HandoverPackage) => number;
};

const mcProgressMap: McProgress[] = [
  // OS
  {
    color: () => '#d9eaf2',
    accessor: (item) => item.mechanicalCompletionPkgsCount,
  },
  // RFC Sent or Rejected
  {
    color: (item) =>
      item.isRfcRejected
        ? colorMap[item.commissioningPackageStatus]
        : colorMap['RFC Sent'],
    accessor: (item) => item.mechanicalCompletionPkgsRfccShippedCount,
  },
  // TAC or RFC
  {
    color: (item) => {
      if (status.includes('TAC')) {
        return colorMap[item.commissioningPackageStatus];
      }
      return item.isRfcRejected ? colorMap[item.commissioningPackageStatus] : '#7cb342';
    },
    accessor: (item) => item.mechanicalCompletionPkgsRfccSignedCount,
  },
  // RFO Sent or Rejected
  {
    color: (item) =>
      item.isRfoRejected
        ? colorMap[item.commissioningPackageStatus]
        : colorMap['RFO Sent'],
    accessor: (item) => item.mechanicalCompletionPkgsRfocShippedCount,
  },
  // Final color for RFO
  {
    color: (item) =>
      item.isRfoRejected ? colorMap[item.commissioningPackageStatus] : '#0035bc',
    accessor: (item) => item.mechanicalCompletionPkgsRfocSignedCount,
  },
];

// Calculates the progress percentage for a given package
const calculateProgressPercentage = (
  item: HandoverPackage,
  accessor: (item: HandoverPackage) => number
): number => {
  const count = accessor(item);
  return count < 1 || item.mechanicalCompletionPkgsCount === 0
    ? 0
    : (count / item.mechanicalCompletionPkgsCount) * 100;
};

// Function to create a progress gradient based on the package status
export const createProgressGradient = (
  item: HandoverPackage,
  status: PackageStatus = item.dynamicCommissioningStatus
): string => {
  const baseColor = colorMap[status];
  let gradientWidth = 0;

  mcProgressMap.forEach((mcProgress) => {
    const width = calculateProgressPercentage(item, mcProgress.accessor);
    if (width > 0) {
      gradientWidth = Math.floor(width);
    }
  });

  var color = item.commissioningPackageStatus == 'RFC Sent' ? '#A1CA74' : '#d9eaf2';

  return gradientWidth === 100 || gradientWidth === 0
    ? baseColor
    : `linear-gradient(90deg, ${
        colorMap[item.commissioningPackageStatus]
      } ${gradientWidth}%, ${color} ${gradientWidth}%)`;
};
