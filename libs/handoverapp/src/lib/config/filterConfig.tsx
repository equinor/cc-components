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
      name: 'Commpkgno',
      valueFormatter: ({ commissioningPackageNo }) => commissioningPackageNo,
    },
    // {
    //   name: 'Discipline',
    //   valueFormatter: ({ mcDisciplineCodes }) => mcDisciplineCodes,
    //   isQuickFilter: true,
    // },

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
      valueFormatter: ({ mechanicalCompletionStatus }) => mechanicalCompletionStatus,
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
      valueFormatter: ({ location }) => location || null,
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
      valueFormatter: ({
        rfcPlannedDate,
        mechanicalCompletionPkgsCount,
        mechanicalCompletionPkgsRfccShippedCount,
      }) => {
        const dateDiffs = daysDiff(new Date(rfcPlannedDate ?? ''));
        if (
          mechanicalCompletionPkgsCount > 0 &&
          mechanicalCompletionPkgsRfccShippedCount > 0 &&
          mechanicalCompletionPkgsCount !== mechanicalCompletionPkgsRfccShippedCount &&
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
      valueFormatter: ({
        rfcForecastDate,
        mechanicalCompletionPkgsCount,
        mechanicalCompletionPkgsRfccShippedCount,
      }) => {
        if (!rfcForecastDate) return 'Other';
        const dateDiffs = daysDiff(new Date(rfcForecastDate));
        if (
          mechanicalCompletionPkgsCount > 0 &&
          mechanicalCompletionPkgsRfccShippedCount > 0 &&
          mechanicalCompletionPkgsCount !== mechanicalCompletionPkgsRfccShippedCount &&
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
      valueFormatter: ({
        rfoPlannedDate,
        mechanicalCompletionPkgsRfocShippedCount,
        mechanicalCompletionPkgsCount,
      }) => {
        if (!rfoPlannedDate) return 'Other';
        const dateDiffs = daysDiff(new Date(rfoPlannedDate));
        if (
          mechanicalCompletionPkgsCount > 0 &&
          mechanicalCompletionPkgsRfocShippedCount > 0 &&
          mechanicalCompletionPkgsCount !== mechanicalCompletionPkgsRfocShippedCount &&
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
      valueFormatter: ({
        rfoActualDate,
        mechanicalCompletionPkgsCount,
        mechanicalCompletionPkgsRfocShippedCount,
      }) => {
        if (!rfoActualDate) return 'Other';
        const dateDiffs = daysDiff(new Date(rfoActualDate));
        if (
          mechanicalCompletionPkgsCount > 0 &&
          mechanicalCompletionPkgsRfocShippedCount > 0 &&
          mechanicalCompletionPkgsCount !== mechanicalCompletionPkgsRfocShippedCount &&
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
