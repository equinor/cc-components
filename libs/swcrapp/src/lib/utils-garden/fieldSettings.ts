// import { getYearAndWeekFromString } from '@cc-components/shared/utils-dates';
// import { sortByNumber } from '@cc-components/shared/utils-sorting';
// import { SwcrPackage } from '@cc-components/swcrshared';
// import { FieldSettings } from '@equinor/workspace-fusion/garden';
// import { ExtendedGardenFields } from '../types';
// // import {
// //   getHoursGroupKey,
// //   getIsSafetyKey,
// //   getLatestSignedRankingKey,
// //   getNextSignatureRoleKeys,
// //   getNextToSignKeys,
// //   getRfccDueDateKey,
// //   getRfccKey,
// //   getRfocKey,
// //   getStartImplForecastKey,
// //   getTypeKeys,
// // } from '../utils-keys';
// import { sortBySwcrStatusPriority } from '../utils-statuses';

// import { sortByDate } from './sortByDate';
// import { sortByIsSafety } from './sortByIsSafety';
// import { sortByLastSignedRanking } from './sortByLastSignedRanking';

// export const fieldSettings: FieldSettings<SwcrPackage, ExtendedGardenFields> = {
//   isSafety: { label: 'Is Safety', getKey: getIsSafetyKey, getColumnSort: sortByIsSafety },
//   estimatedManhours: {
//     label: 'Estimated man hours',
//     getKey: getHoursGroupKey,
//     getColumnSort: sortByNumber,
//   },
//   types: { label: 'Types', getKey: getTypeKeys },
//   nextToSign: { label: 'Next signature by', getKey: getNextToSignKeys },
//   nextSignatureRole: { label: 'Next signature role', getKey: getNextSignatureRoleKeys },
//   latestSignRanking: {
//     label: 'Last signed ranking',
//     getKey: getLatestSignedRankingKey,
//     getColumnSort: sortByLastSignedRanking,
//   },
//   RFCC: { label: 'RFCC', getKey: getRfccKey },
//   RFCCDueDate: {
//     label: 'RFCC duedate',
//     getKey: getRfccDueDateKey,
//     getColumnSort: sortByDate,
//   },
//   startImplForecast: {
//     label: 'Start impl. forecast',
//     getKey: getStartImplForecastKey,
//     getColumnSort: sortByDate,
//   },
//   RFOC: { label: 'RFOC', getKey: getRfocKey },
//   closedAtDate: {
//     label: 'Closed at date',
//     getKey: (item) => [getYearAndWeekFromString(item.closedAtDate)],
//     getColumnSort: sortByDate,
//   },
//   dueAtDate: {
//     label: 'Due date',
//     getKey: (item) => [getYearAndWeekFromString(item.dueAtDate)],
//     getColumnSort: sortByDate,
//   },
//   siteCode: { label: 'Site Code' },
//   projectIdentifier: { label: 'ProjectIdentifier' },
//   swcrNo: { label: 'Swcr No' },
//   priority: { label: 'Priority' },
//   system: { label: 'System' },
//   controlSystem: { label: 'Control System' },
//   contract: { label: 'Contract' },
//   action: { label: 'Action' },
//   supplier: { label: 'Supplier' },
//   node: { label: 'Node' },
//   referenceTypes: { label: 'Reference Types' },
//   nextSignRanking: { label: 'Next signature ' },
//   cpkgNo: { label: 'CommPK' },
//   cpkgPhase: { label: 'Phase' },
//   status: { key: 'status', label: 'Status', getColumnSort: sortBySwcrStatusPriority },
// };
