import { HandoverPackage } from '@cc-components/handovershared';
import { StatusSquare } from '@cc-components/shared/common';
import { colorMap, statusColorMap } from '@cc-components/shared/mapping';
import { hasProperty } from '@cc-components/shared/utils-typescript';
import { FilterConfig } from '@equinor/workspace-fusion/filter';
import { daysDiff, getFilterDateValues } from '../utils-filter';
import { getStatus } from '../utils-statuses/getStatus';

export const filterConfig: FilterConfig<HandoverPackage> = {
  filterGroups: [
    {
      name: 'Comm pkg',
      valueFormatter: ({ commpkgNo }) => commpkgNo,
    },
    {
      name: 'Discipline',
      valueFormatter: ({ mcDisciplineCodes }) => mcDisciplineCodes,
      isQuickFilter: true,
    },

    {
      name: 'Comm pkg status',
      valueFormatter: (pkg) => getStatus(pkg),
      isQuickFilter: true,
      customValueRender: (value) => {
        if (typeof value !== 'string') return <span>{value}</span>;
        return (
          <StatusSquare
            content={value}
            statusColor={hasProperty(colorMap, value) ? colorMap[value] : 'transparent'}
          />
        );
      },
    },
    {
      name: 'MC status',
      valueFormatter: ({ mcStatus }) => mcStatus,
      isQuickFilter: true,
      customValueRender: (value) => {
        if (typeof value !== 'string') return <span>{value}</span>;
        return (
          <StatusSquare
            content={value}
            statusColor={
              hasProperty(statusColorMap, value) ? statusColorMap[value] : 'transparent'
            }
          />
        );
      },
    },
    {
      name: 'Responsible',
      valueFormatter: ({ responsible }) => responsible,
      isQuickFilter: true,
    },
    {
      name: 'Area',
      valueFormatter: ({ area }) => area || null,
    },
    {
      name: 'Phase',
      valueFormatter: ({ phase }) => phase || null,
    },

    {
      name: 'System',
      valueFormatter: ({ system }) => system,
      isQuickFilter: true,
    },

    {
      name: 'Priority 1',
      valueFormatter: ({ priority1 }) => priority1 || null,
    },
    {
      name: 'Priority 2',
      valueFormatter: ({ priority2 }) => priority2 || null,
    },
    {
      name: 'Priority 3',
      valueFormatter: ({ priority3 }) => priority3 || null,
    },
    {
      name: 'Planned RFC',
      valueFormatter: ({ plannedStartDate, mcPkgsCount, mcPkgsRFCCShippedCount }) => {
        const dateDiffs = daysDiff(new Date(plannedStartDate));
        if (
          mcPkgsCount > 0 &&
          mcPkgsRFCCShippedCount > 0 &&
          mcPkgsCount !== mcPkgsRFCCShippedCount &&
          dateDiffs.days <= 0
        ) {
          return 'Overdue';
        } else {
          return getFilterDateValues(dateDiffs.days);
        }
      },
    },
    {
      name: 'Forecast RFC',
      valueFormatter: ({ forecastStartDate, mcPkgsCount, mcPkgsRFCCShippedCount }) => {
        const dateDiffs = daysDiff(new Date(forecastStartDate));
        if (
          mcPkgsCount > 0 &&
          mcPkgsRFCCShippedCount > 0 &&
          mcPkgsCount !== mcPkgsRFCCShippedCount &&
          dateDiffs.days <= 0
        ) {
          return 'Overdue';
        } else {
          return getFilterDateValues(dateDiffs.days);
        }
      },
    },
    {
      name: 'Planned RFO',
      valueFormatter: ({ rfocPlannedDate, mcPkgsRFOCShipped, mcPkgsCount }) => {
        const dateDiffs = daysDiff(new Date(rfocPlannedDate));
        if (
          mcPkgsCount > 0 &&
          mcPkgsRFOCShipped > 0 &&
          mcPkgsCount !== mcPkgsRFOCShipped &&
          dateDiffs.days <= 0
        ) {
          return 'Overdue';
        } else {
          return getFilterDateValues(dateDiffs.days);
        }
      },
    },
    {
      name: 'Actual RFO',
      valueFormatter: ({ rfocActualDate, mcPkgsCount, mcPkgsRFOCShipped }) => {
        const dateDiffs = daysDiff(new Date(rfocActualDate));
        if (
          mcPkgsCount > 0 &&
          mcPkgsRFOCShipped > 0 &&
          mcPkgsCount !== mcPkgsRFOCShipped &&
          dateDiffs.days <= 0
        ) {
          return 'Overdue';
        } else {
          return getFilterDateValues(dateDiffs.days);
        }
      },
    },
  ],
};
