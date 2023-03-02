import { Punch } from '@cc-components/punchshared';
import { StatusSquare } from '@cc-components/shared/common';
import { hasProperty } from '@cc-components/shared/utils-typescript';
import { FilterConfig } from '@equinor/workspace-fusion/filter';
import { getHasWO, getMaterialRequired } from '../utils-filter/';
import { punchStatusColors } from '../utils-statuses/punchStatusColors';

export const filterConfig: FilterConfig<Punch> = {
  filterGroups: [
    {
      name: 'Status',
      valueFormatter: (punch) => punch.status,
      isQuickFilter: true,
      customValueRender: (value) => {
        if (!value) {
          return <>(Blank)</>;
        }
        const statusColor = hasProperty(punchStatusColors, value)
          ? punchStatusColors[value]
          : 'transparent';
        return <StatusSquare statusColor={statusColor} content={value.toString()} />;
      },
    },
    {
      name: 'Category',
      valueFormatter: (punch) => punch.category,
    },
    {
      name: 'Clearing by',
      valueFormatter: (punch) => punch.cleardBy,
      isQuickFilter: true,
    },
    {
      name: 'Raised by',
      valueFormatter: (punch) => punch.raisedBy,
    },
    {
      name: 'Punch priority',
      valueFormatter: (punch) => punch.priority,
      isQuickFilter: true,
    },
    {
      name: 'PL Sorting',
      valueFormatter: (punch) => punch.sorting,
      isQuickFilter: true,
    },
    {
      name: 'PL type',
      valueFormatter: (punch) => punch.type,
    },
    {
      name: 'Has Workorder',
      valueFormatter: (pkg) => getHasWO(pkg),
    },
    {
      name: 'Responsible',
      valueFormatter: (punch) => punch.responsible,
    },
    {
      name: 'Material',
      valueFormatter: (pkg) => getMaterialRequired(pkg),
    },
    // {
    //     name: 'Commpkg',
    //     valueFormatter: (punch) => punch.commissioningPackageNo,
    // },
    {
      name: 'System',
      valueFormatter: (punch) => punch.system,
    },
    {
      name: 'Identifier',
      valueFormatter: (punch) => punch.identifier,
    },
  ],
};
