import { Progress } from '../types';

export const progressPriMap: Record<Progress, number> = {
  'Not Started': 1,
  '0-25%': 2,
  '25-50%': 3,
  '50-75%': 4,
  '75-95%': 5,
  '95-99%': 6,
  '100%': 7,
};

export const progressValueFormatter = (projectProgress: string | null): Progress => {
  const progress = parseFloat(projectProgress || '');
  if (progress >= 100) {
    return '100%';
  } else if (progress >= 95) {
    return '95-99%';
  } else if (progress >= 75) {
    return '75-95%';
  } else if (progress >= 50) {
    return '50-75%';
  } else if (progress >= 25) {
    return '25-50%';
  } else if (progress > 0) {
    return '0-25%';
  } else {
    return 'Not Started';
  }
};
