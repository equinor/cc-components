import { FollowUpStatuses } from '@cc-components/shared';
import { Progress, WorkOrder } from '../types';
import { FollowUpStatusFilter } from '../ui-filter';
import { progressPriMap, progressValueFormatter } from '../utils-filter';
import { followUpStatusPriorityMap, getFollowUpStatus } from '../utils-statuses';
import { FilterConfig } from '@equinor/workspace-fusion/filter';

export const filterConfig: FilterConfig<WorkOrder> = {
  filterGroups: [
    {
      name: 'Discipline',
      valueFormatter: ({ disciplineCode }) => disciplineCode,
      isQuickFilter: true,
    },
    {
      name: 'Job status',
      valueFormatter: ({ jobStatus }) => jobStatus,
      isQuickFilter: true,
    },
    {
      name: 'Status',
      valueFormatter: (workOrder) => getFollowUpStatus(workOrder),
      sort: (filterValues) =>
        filterValues.sort(
          (a, b) =>
            followUpStatusPriorityMap[b as FollowUpStatuses] -
            followUpStatusPriorityMap[a as FollowUpStatuses]
        ),
      customValueRender: (filterValue) => {
        return <FollowUpStatusFilter status={filterValue as FollowUpStatuses} />;
      },
      isQuickFilter: true,
    },
    {
      name: 'Responsible',
      valueFormatter: ({ responsibleCode }) => responsibleCode,
    },
    {
      name: 'Milestone',
      valueFormatter: ({ milestoneCode }) => milestoneCode,
    },

    // {
    //     name: 'Start date',
    //     valueFormatter: ({ plannedStartupDate, actualStartupDate, plannedStartDateDiff }) => {
    //         if (!plannedStartDateDiff) return 'Other';
    //         const plannedDate = new Date(plannedStartupDate || '');
    //         const actualDate = new Date(actualStartupDate || '');
    //         // const dateDiffs = daysDiff(plannedDate);

    //         // If planned start date is a date that has already been
    //         // and the actual date happened later than the planned or that there is no actual date
    //         if (
    //             plannedStartDateDiff.days <= 0 &&
    //             (actualDate.getTime() > plannedDate.getTime() || !actualStartupDate)
    //         ) {
    //             return 'Overdue';
    //         }
    //         //If actual start date happened before planned start date
    //         else if (actualDate.getTime() < plannedDate.getTime()) {
    //             return 'Other';
    //         } else {
    //             return getFilterDateValues(plannedStartDateDiff.days);
    //         }
    //     },
    // },
    // {
    //     name: 'Finish date',
    //     valueFormatter: ({ plannedFinishDate, actualFinishDate }) => {
    //         const plannedDate = new Date(plannedFinishDate || '');
    //         const actualDate = new Date(actualFinishDate || '');
    //         const dateDiffs = daysDiff(plannedDate);

    //         if (
    //             dateDiffs.days <= 0 &&
    //             (actualDate.getTime() > plannedDate.getDate() || !actualFinishDate)
    //         ) {
    //             return 'Overdue';
    //         } else if (actualDate.getTime() < plannedDate.getTime()) {
    //             return 'Other';
    //         } else {
    //             return getFilterDateValues(dateDiffs.days);
    //         }
    //     },
    // },
    {
      name: 'Material',
      valueFormatter: ({ materialStatus }) => materialStatus,
      isQuickFilter: true,
    },
    {
      name: 'Hold',
      valueFormatter: ({ holdBy }) => holdBy,
      isQuickFilter: true,
    },
    {
      name: 'MC',
      valueFormatter: ({ mccrStatus }) => mccrStatus,
    },
    {
      name: 'Progress',
      valueFormatter: ({ projectProgress }): Progress => {
        return progressValueFormatter(projectProgress);
      },
      sort: (filterValues) =>
        filterValues.sort(
          (a, b) => progressPriMap[a as Progress] - progressPriMap[b as Progress]
        ),
    },
  ],
};
