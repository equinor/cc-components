const isSafetyOrder = { Yes: 1, No: 2, Related: 3 };
export const sortByIsSafety = (a: string, b: string): number => {
  return (
    isSafetyOrder[a as keyof typeof isSafetyOrder] -
    isSafetyOrder[b as keyof typeof isSafetyOrder]
  );
};
