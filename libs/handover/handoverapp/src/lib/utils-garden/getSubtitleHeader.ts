import { HandoverPackage } from '@cc-components/handover/shared';
import { getStatus, statusPriorityMap } from '../utils-statuses';

export const getSubtitleHeader = (
  items: HandoverPackage[],
  groupByKey: string | undefined
): string => {
  const totalLength = items.length;
  const statusPriorities = items.map((commpkg) => statusPriorityMap[getStatus(commpkg)]);
  switch (groupByKey) {
    case 'RFCC': {
      const rfcc = statusPriorities.filter(
        (priority) => priority <= statusPriorityMap['RFCC Accepted']
      ).length;
      return `RFCC ${rfcc}/${totalLength}`;
    }

    case 'RFOC': {
      const rfoc = statusPriorities.filter(
        (priority) => priority <= statusPriorityMap['RFOC Accepted']
      ).length;
      return `RFOC ${rfoc}/${totalLength}`;
    }
    case 'TAC': {
      const tac = items.filter((commpkg) => getStatus(commpkg) === 'TAC Accepted').length;
      return `TAC ${tac}/${totalLength}`;
    }

    case 'DCC': {
      const dcc = items.filter((commpkg) => getStatus(commpkg) === 'DCC Accepted').length;
      return `DCC ${dcc}/${totalLength}`;
    }

    case 'RFRC': {
      const rfrc = items.filter(
        (commpkg) => getStatus(commpkg) === 'RFRC Accepted'
      ).length;
      return `RFRC ${rfrc}/${totalLength}`;
    }

    default: {
      const os = items.filter((commpkg) => getStatus(commpkg) === 'OS').length;
      return `OS ${os}/${totalLength}`;
    }
  }
};
