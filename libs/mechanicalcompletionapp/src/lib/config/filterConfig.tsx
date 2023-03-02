import { McPackage, McStatus } from '@cc-components/mechanicalcompletionshared';
import { StatusSquare } from '@cc-components/shared/common';
import { statusColorMap } from '@cc-components/shared/mapping';
import { hasProperty } from '@cc-components/shared/utils-typescript';
import { FilterConfig } from '@equinor/workspace-fusion/filter';
import { CommissioningStatus } from '../types';
import {
  commissioningStatusOrder,
  getCommissioningStatus,
  mcStatusPriority,
  commStatusColors,
} from '../utils-statuses';

export const filterConfig: FilterConfig<McPackage> = {
  filterGroups: [
    {
      name: 'System',
      valueFormatter: (mc) => mc.system,
      isQuickFilter: true,
    },
    {
      name: 'Responsible',
      valueFormatter: (mc) => mc.responsible,
      isQuickFilter: true,
    },
    {
      name: 'Discipline',
      valueFormatter: (mc) => mc.discipline,
      isQuickFilter: true,
    },
    {
      name: 'MC status',
      valueFormatter: (mc) => mc.mcStatus,
      customValueRender: (mcStatus) => {
        if (!mcStatus) return <>(Blank)</>;

        return (
          <StatusSquare
            content={String(mcStatus)}
            statusColor={
              hasProperty(statusColorMap, mcStatus)
                ? statusColorMap[mcStatus]
                : 'transparent'
            }
          />
        );
      },
      sort: (filterValues) =>
        filterValues.sort(
          (a, b) => mcStatusPriority[a as McStatus] - mcStatusPriority[b as McStatus]
        ),
      isQuickFilter: true,
    },
    {
      name: 'Handover Status',
      valueFormatter: (mc) => {
        return getCommissioningStatus(mc);
      },
      sort: (filterValues) =>
        filterValues.sort(
          (a, b) =>
            commissioningStatusOrder[a as CommissioningStatus] -
            commissioningStatusOrder[b as CommissioningStatus]
        ),
      customValueRender: (filterValue) => {
        if (!filterValue) return <>(Blank)</>;

        return (
          <StatusSquare
            content={String(filterValue)}
            statusColor={
              hasProperty(commStatusColors, filterValue)
                ? commStatusColors[filterValue]
                : 'transparent'
            }
          />
        );
      },
      isQuickFilter: true,
    },

    {
      name: 'MC Package Phase',
      valueFormatter: (mc) => mc.phase || null,
    },
    {
      name: 'Commissioning Priority 1',
      valueFormatter: (mc) => mc.priority || null,
    },
    {
      name: 'Area',
      valueFormatter: (mc) => mc.area || null,
    },

    {
      name: 'Subsystem',
      valueFormatter: (mc) => mc.subsystem,
    },
    {
      name: 'Remark',
      valueFormatter: (mc) => mc.remark || null,
    },

    {
      name: 'M-01 Contractor Final Punch Actual Date',
      valueFormatter: (mc) => (mc.finalPunchActualDate ? 'Yes' : 'No'),
    },
    {
      name: 'M-02 Punch Status Accepted Actual Date',
      valueFormatter: (mc) => (mc.punchAcceptActualDate ? 'Yes' : 'No'),
    },
    {
      name: 'M-03 RFC MC to Commissioning Actual Date',
      valueFormatter: (mc) => (mc.rfccForecastDate || mc.rfccPlannedDate ? 'Yes' : 'No'),
    },
    {
      name: 'M-04 RFCC Actual Date',
      valueFormatter: (mc) => (mc.rfccActualDate ? 'Yes' : 'No'),
    },

    {
      name: 'Commissioning Priority 2',
      valueFormatter: (mc) => mc.priority2 || 'N/A',
    },
    {
      name: 'Commissioning Priority 3',
      valueFormatter: (mc) => mc.priority3 || 'N/A',
    },
  ],
};
