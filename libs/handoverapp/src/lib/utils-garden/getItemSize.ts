export const getItemSize = (
  volume: number,
  maxVolume: number
): 'small' | 'medium' | 'large' => {
  if (maxVolume <= 0) return 'small';
  const percentage = (volume / maxVolume) * 100;
  return percentage > 66 ? 'large' : percentage > 33 ? 'medium' : 'small';
};
