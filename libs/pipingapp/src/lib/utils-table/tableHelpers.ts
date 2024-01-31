export const generateCommaSeperatedString = (array: string[], length: number = 3): string => {
  const value = array.slice(0, length).join(', ');

  if (array.length > length) {
    return `${value} (+${array.length - length})`;
  }

  return value;
};
