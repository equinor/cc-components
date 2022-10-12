/*eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck TODO: Import FitlerOptions from Filter Package

import { CommissioningStatus, McStatus } from '../types';
import { HandoverStatusFilter, McStatusFilter } from '../ui-filter';
import {
  commissioningStatusOrder,
  getCommissioningStatus,
  mcStatusPriority,
} from '../utils-statuses';
export const filterConfig = [
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
    customValueRender: (mcStatus) => <McStatusFilter status={mcStatus as McStatus} />,
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
      return <HandoverStatusFilter status={filterValue as CommissioningStatus} />;
    },
    isQuickFilter: true,
  },

  {
    name: 'MC Package Phase',
    valueFormatter: (mc) => mc.phase,
  },
  {
    name: 'Commissioning Priority 1',
    valueFormatter: (mc) => mc.priority || 'N/A',
  },
  {
    name: 'Area',
    valueFormatter: (mc) => mc.area,
  },

  {
    name: 'Subsystem',
    valueFormatter: (mc) => mc.subsystem,
  },
  {
    name: 'Remark',
    valueFormatter: (mc) => mc.remark,
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
];
