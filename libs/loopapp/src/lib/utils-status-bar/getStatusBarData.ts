import { Loop } from '../types';

type Kpi = {
  uniqueLoopTags: number;
  uniqueChecklists: number;
  checklistsSigned: number;
  checklistsNotSigned: number;
  ready: number;
  overdueChecklists: number;
  complete: number;
};
type PartialKpi = Pick<
  Kpi,
  'ready' | 'overdueChecklists' | 'checklistsSigned' | 'checklistsNotSigned'
>;
export const getStatusBarData = (loops: Loop[]): Kpi => {
  const uniqueLoops = new Set();
  const counts = loops.reduce(
    (acc, curr) => {
      uniqueLoops.add(curr.loopNo);
      if (curr.signedDate) {
        acc.checklistsSigned += 1;
      } else {
        acc.checklistsNotSigned += 1;
      }
      if (curr.isOverdue) {
        acc.overdueChecklists += 1;
      }

      if (
        (curr.loopContentStatus === 'PB' ||
          curr.loopContentStatus === 'OK' ||
          !curr.loopContentStatus) &&
        !curr.signedDate
      ) {
        acc.ready += 1;
      }

      return acc;
    },
    {
      checklistsSigned: 0,
      checklistsNotSigned: 0,
      ready: 0,
      overdueChecklists: 0,
    } as PartialKpi
  );

  return {
    ...counts,
    uniqueChecklists: loops.length,
    uniqueLoopTags: uniqueLoops.size,
    complete: Number(((counts.checklistsSigned / loops.length) * 100).toFixed(2)),
  };
};
