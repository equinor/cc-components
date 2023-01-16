import {
  FollowUpStatuses,
  hasProperty,
  statusColorMap,
  StatusSquare,
} from '@cc-components/shared';
import { Progress } from '../types';
import { progressPriMap, progressValueFormatter } from '../utils-filter';
import {
  followUpColorMap,
  followUpStatusPriorityMap,
  getFollowUpStatus,
} from '../utils-statuses';
import { FilterConfig } from '@equinor/workspace-fusion/filter';
import { WorkOrder } from '@cc-components/workordershared';

export const filterConfig: FilterConfig<WorkOrder> = {
  filterGroups: [
    {
      name: 'Discipline',
      valueFormatter: ({ disciplineCode }) => disciplineCode,
      isQuickFilter: true,
    },
    {
      name: 'Job status',
      valueFormatter: ({ jobStatus }) => jobStatus || null,
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
        if (!filterValue) return <>(Blank)</>;

        return (
          <StatusSquare
            content={String(filterValue)}
            statusColor={
              hasProperty(followUpColorMap, filterValue)
                ? followUpColorMap[filterValue]
                : 'transparent'
            }
          />
        );
      },
      isQuickFilter: true,
    },
    {
      name: 'Responsible',
      valueFormatter: ({ responsibleCode }) => responsibleCode || null,
    },
    {
      name: 'Milestone',
      valueFormatter: ({ milestoneCode }) => milestoneCode || null,
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
      valueFormatter: ({ materialStatus }) => materialStatus || null,
      isQuickFilter: true,
    },
    {
      name: 'Hold',
      valueFormatter: ({ holdBy }) => holdBy || null,
      isQuickFilter: true,
    },
    {
      name: 'MC',
      valueFormatter: ({ mccrStatus }) => mccrStatus || null,
      customValueRender: (filterValue) => {
        if (!filterValue) {
          return <>(Blank)</>;
        }
        return (
          <StatusSquare
            content={String(filterValue)}
            statusColor={
              hasProperty(statusColorMap, filterValue)
                ? statusColorMap[filterValue]
                : 'transparent'
            }
          />
        );
      },
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
