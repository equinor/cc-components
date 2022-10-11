import { Status } from '../types/status';

/** Dictionary for mapping Status to colors */
export const colorMap: Record<Status, string> = {
  'No status': '#d1d1d1',
  'RFOC Sent': '#09CCF2',
  'RFOC Accepted': '#0035BC',
  'RFOC Rejected': '#FF3B3B',
  'RFCC Sent': '#C5E1A5',
  'RFCC Accepted': '#7CB342',
  'RFCC Rejected': '#FF3B3B',
  'TAC Sent': '#EDB882',
  'TAC Accepted': '#E77422',
  'TAC Rejected': '#FF3B3B',
  'DCC Sent': '#DCE775',
  'DCC Accepted': '#827717',
  'RFRC Sent': '#D7CCC8',
  'RFRC Accepted': '#5D4037',
  OS: '#D9E9F2',
  PB: '#ffc107',
  PA: '#ff4081',
  OK: '#00c853',
};
