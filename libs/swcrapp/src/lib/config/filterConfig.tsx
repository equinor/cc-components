import { SwcrPackage, SwcrStatus } from '@cc-components/swcrshared';
import { FilterConfig } from '@equinor/workspace-fusion/filter';
import { StatusFilter } from '../ui-filter';
import {
  getLatestSignedRankingKey,
  getNextSignatureRoleKeys,
  getNextToSignKeys,
} from '../utils-keys';
import { sortBySwcrStatusPriority } from '../utils-statuses';

export const filterConfig: FilterConfig<SwcrPackage> = {
  filterGroups: [
    {
      name: 'Status',
      valueFormatter: ({ status }) => status,
      isQuickFilter: true,
      sort: (filterValues) =>
        filterValues.sort((a, b) => sortBySwcrStatusPriority(a as string, b as string)),
      customValueRender: (value) => {
        return <StatusFilter status={value as SwcrStatus} />;
      },
    },
    {
      name: 'Project identifier',
      valueFormatter: ({ projectIdentifier }) => projectIdentifier,
      defaultHidden: true,
    },
    {
      name: 'Contract',
      valueFormatter: ({ contract }) => contract,
      isQuickFilter: true,
    },
    {
      name: 'Supplier',
      valueFormatter: ({ supplier }) => (supplier ? supplier : null),
      isQuickFilter: true,
    },
    {
      name: 'System',
      valueFormatter: ({ system }) => system,
      isQuickFilter: true,
    },
    {
      name: 'Types',
      valueFormatter: ({ types }) => (types.length > 0 ? types.split(',') : []),
      isQuickFilter: true,
    },
    {
      name: 'Plant',
      valueFormatter: ({ siteCode }) => siteCode,
      defaultHidden: true,
    },
    {
      name: 'Priority',
      valueFormatter: ({ priority }) => (priority ? priority : null),
      defaultHidden: false,
    },
    {
      name: 'Control system',
      valueFormatter: ({ controlSystem }) => controlSystem,
      defaultHidden: true,
    },
    {
      name: 'Next signature by',
      valueFormatter: (swcr) => getNextToSignKeys(swcr, ''),
    },
    {
      name: 'Next signature role',
      valueFormatter: (swcr) => getNextSignatureRoleKeys(swcr, ''),
    },
    {
      name: 'Last signed ranking',
      valueFormatter: (swcr) => getLatestSignedRankingKey(swcr, ''),
      defaultHidden: true,
    },
    {
      name: 'Action',
      valueFormatter: ({ action }) => action,
      defaultHidden: true,
    },
    {
      name: 'Node',
      valueFormatter: ({ node }) => node,
      defaultHidden: true,
    },
    {
      name: 'Estimated manhours',
      valueFormatter: ({ estimatedManhours }) => estimatedManhours,
      defaultHidden: true,
    },
    {
      name: 'COMMPK no',
      valueFormatter: ({ cpkgNo }) => cpkgNo,
      defaultHidden: true,
    },
    {
      name: 'COMM phase',
      valueFormatter: ({ cpkgPhase }) => cpkgPhase,
      defaultHidden: true,
    },
    {
      name: 'Other references',
      valueFormatter: ({ referenceTypes }) => referenceTypes,
      defaultHidden: true,
    },
    {
      name: 'Due date',
      valueFormatter: ({ dueAtDate }) => dueAtDate,
      defaultHidden: true,
    },
  ],
};
