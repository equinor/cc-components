import { Loop } from '@cc-components/loopshared';
import { StatusSquare } from '@cc-components/shared/common';
import { statusColorMap } from '@cc-components/shared/mapping';
import { hasProperty } from '@cc-components/shared/utils-typescript';
import { FilterConfig } from '@equinor/workspace-fusion/filter';

export const filterConfig: FilterConfig<Loop> = {
  filterGroups: [
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
      customValueRender: (filterValue) => {
        if (!filterValue) return <>(Blank)</>;

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
      isQuickFilter: true,
    },
    {
      name: 'Content MC status',
      valueFormatter: (pkg) => pkg.loopContentStatus,
      customValueRender: (filterValue) => {
        if (!filterValue) return <>(Blank)</>;

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
  ],
};
