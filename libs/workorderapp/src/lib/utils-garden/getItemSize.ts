export const getItemSize = (estimatedHours: number): 'large' | 'medium' | 'small' => {
  return estimatedHours >= 200 ? 'large' : estimatedHours < 90 ? 'small' : 'medium';
};
