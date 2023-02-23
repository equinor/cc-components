import { Loop } from '@cc-components/loopshared';
import { numberFormat } from '@cc-components/shared';
import { StatusBarConfig } from '@equinor/workspace-fusion/status-bar';
import { getStatusBarData } from '../utils-status-bar';

export const statusBarConfig: StatusBarConfig<Loop> = (data) => {
  const kpis = getStatusBarData(data);

  return [
    {
      title: 'Loop tags',
      value: numberFormat(kpis.uniqueLoopTags),
    },
    {
      title: 'Checklists',
      value: numberFormat(kpis.uniqueChecklists),
    },
    {
      title: 'Checklist signed',
      value: numberFormat(kpis.checklistsSigned),
    },
    {
      title: 'Checklist not signed',
      value: numberFormat(kpis.checklistsNotSigned),
    },
    {
      title: 'Ready',
      value: numberFormat(kpis.ready),
    },
    {
      title: 'Overdue checklists',
      value: numberFormat(kpis.overdueChecklists),
    },
    {
      title: '% complete',
      value: `${kpis.complete}%`,
    },
  ];
};
