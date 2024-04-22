export const getTextColor = (status: string) => {
  if (status === 'Pressure test' || status === 'Insulation' || status === 'Complete')
    return '#000000';

  return '#ffffff';
};
