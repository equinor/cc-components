/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck //TODO Remove when FilterOptions type is ready

export const filterConfig = [
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
    valueFormatter: (punch) => punch.clearingByOrganization,
    isQuickFilter: true,
  },
  {
    name: 'Priority',
    valueFormatter: (punch) => punch.punchPriority,
    isQuickFilter: true,
  },
  {
    name: 'Sorting',
    valueFormatter: (punch) => punch.punchListSorting,
    isQuickFilter: true,
  },
  {
    name: 'Category',
    valueFormatter: (punch) => punch.punchItemCategory,
  },
  {
    name: 'Type',
    valueFormatter: (punch) => punch.punchListType,
  },
];
