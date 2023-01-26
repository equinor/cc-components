import { FilterConfig } from '@equinor/workspace-fusion/filter';
import { Punch } from '../types';

export const filterConfig: FilterConfig<Punch> = {
  filterGroups: [
    {
      name: 'Open/closed',
      valueFormatter: (punch) => {
        if (punch.clearedAtDate) {
          return 'Closed';
        } else {
          return 'Open';
        }
      },
      isQuickFilter: true,
    },
    {
      name: 'Clearing by',
      valueFormatter: (punch) => punch.cleardBy,
      isQuickFilter: true,
    },
    {
      name: 'Priority',
      valueFormatter: (punch) => punch.priority,
      isQuickFilter: true,
    },
    {
      name: 'Sorting',
      valueFormatter: (punch) => punch.sorting,
      isQuickFilter: true,
    },
    {
      name: 'Category',
      valueFormatter: (punch) => punch.category,
    },
    {
      name: 'Type',
      valueFormatter: (punch) => punch.type,
    },
  ],
};
