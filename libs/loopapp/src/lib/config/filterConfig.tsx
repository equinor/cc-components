import { hasProperty, statusColorMap, StatusSquare } from '@cc-components/shared';
import { FilterConfig } from '@equinor/workspace-fusion/filter';
import { Loop } from '../types';

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
