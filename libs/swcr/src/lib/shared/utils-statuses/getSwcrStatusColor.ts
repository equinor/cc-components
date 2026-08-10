import { SwcrStatus } from '../types/swcrStatus';

const swcrPackageStatusColors: Record<SwcrStatus, string> = {
  'Not initiated': '#D9EAF2',
  Initiated: '#BCF316',
  Accepted: '#60F316',
  'Ready for Retest': '#F0A875',
  Tested: '#0DCCF2',
  Closed: '#0D59F2',
  //TODO - Need to figure out what color Close - Rejected should be.
  'Closed - Rejected': '#001B3A',
};
export const getSwcrStatusColor = (status: SwcrStatus | undefined): string =>
  status ? swcrPackageStatusColors[status] : 'transparent';
