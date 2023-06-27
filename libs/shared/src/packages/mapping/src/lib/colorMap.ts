import { PackageStatus } from '../../../types/src/lib/packageStatus';

/** Dictionary for mapping MC & Commpkg statuses to colors */
export const colorMap: Record<PackageStatus, string> = {
  'No status': '#d1d1d1',
  'RFO Sent': '#09CCF2',
  'RFO Accepted': '#0035BC',
  'RFO Rejected': '#FF3B3B',
  'RFC Sent': '#C5E1A5',
  'RFC Accepted': '#7CB342',
  'RFC Partly signed': '#A1CA74',
  'RFC Rejected': '#FF3B3B',
  'TAC Sent': '#EDB882',
  'TAC Accepted': '#E77422',
  'TAC Rejected': '#FF3B3B',
  'DCC Sent': '#DCE775',
  'DCC Accepted': '#827717',
  'RFR Sent': '#D7CCC8',
  'RFR Accepted': '#5D4037',
  OS: '#D9E9F2',
  PB: '#ffc107',
  PA: '#ff4081',
  OK: '#00c853',
};
