/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck //TODO Remove when FilterOptions type is ready

export const filterConfig = [
  {
    name: 'Category',
    valueFormatter: (punch) => punch.punchItemCategory,
  },
  {
    name: 'PL Sorting',
    valueFormatter: (punch) => punch.punchListSorting,
    isQuickFilter: true,
  },
  {
    name: 'PL type',
    valueFormatter: (punch) => punch.punchListType,
    isQuickFilter: true,
  },
  {
    name: 'Punch priority',
    valueFormatter: (punch) => punch.punchPriority,
  },
];
