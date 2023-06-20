import { HandoverPackage } from '@cc-components/handovershared';
import { statusPriorityMap } from '../utils-statuses';

export const getSubtitleHeader = (
  items: HandoverPackage[],
  groupByKey: string | undefined
): string => {
  const totalLength = items.length;
  const statusPriorities = items.map((commpkg) => statusPriorityMap[commpkg.commissioningPackageStatus]);
  switch (groupByKey) {
    case 'RFCC': {
      const rfcc = statusPriorities.filter(
        (priority) => priority <= statusPriorityMap['RFC Accepted']
      ).length;
      return `RFCC ${rfcc}/${totalLength}`;
    }

    case 'RFOC': {
      const rfoc = statusPriorities.filter(
        (priority) => priority <= statusPriorityMap['RFO Accepted']
      ).length;
      return `RFOC ${rfoc}/${totalLength}`;
    }
    case 'TAC': {
      const tac = items.filter((commpkg) => commpkg.commissioningPackageStatus === 'TAC Accepted').length;
      return `TAC ${tac}/${totalLength}`;
    }

    case 'DCC': {
      const dcc = items.filter((commpkg) => commpkg.commissioningPackageStatus === 'DCC Accepted').length;
      return `DCC ${dcc}/${totalLength}`;
    }

    case 'RFRC': {
      const rfrc = items.filter(
        (commpkg) => commpkg.commissioningPackageStatus === 'RFR Accepted'
      ).length;
      return `RFRC ${rfrc}/${totalLength}`;
    }

    default: {
      const os = items.filter((commpkg) => commpkg.commissioningPackageStatus === 'OS').length;
      return `OS ${os}/${totalLength}`;
    }
  }
};
