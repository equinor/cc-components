import { PunchStatus } from '@cc-components/punchshared';
import { itemContentColors } from '@cc-components/shared/mapping';

export const punchStatusColors: Record<PunchStatus, string> = {
  'Cleared not verified': '#0084C4',
  Open: '#D9EAF2',
  Closed: '#4BB748',
};

export const punchStatusTextColors: Record<PunchStatus, string> = {
  'Cleared not verified': itemContentColors.Dark,
  Open: itemContentColors.Light,
  Closed: itemContentColors.Dark,
};
