/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck //TODO Remove when FilterOptions type is ready
export const filterConfig = [
  {
    name: 'Priority',
    valueFormatter: (pkg) => pkg.priority1,
    isQuickFilter: true,
  },
  {
    name: 'Responsible',
    valueFormatter: (pkg) => pkg.responsible,
    isQuickFilter: true,
  },
  {
    name: 'Checklist status',
    valueFormatter: (pkg) => pkg.status,
    isQuickFilter: true,
  },
  {
    name: 'Content MC status',
    valueFormatter: (pkg) => pkg.loopContentStatus,
    isQuickFilter: true,
  },
  {
    name: 'System',
    valueFormatter: (pkg) => pkg.functionalSystem,
  },
  {
    name: 'Form type',
    valueFormatter: (pkg) => pkg.formularType,
  },
];
