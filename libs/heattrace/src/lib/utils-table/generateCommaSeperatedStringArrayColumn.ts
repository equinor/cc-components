export function generateCommaSeperatedStringArrayColumn(
  stringArray: string[],
  maxLength?: number
): string {
  if (stringArray.length === 0) {
    return '';
  }
  const length = maxLength ?? 3;
  let commaString = stringArray.slice(0, length).join(', ');

  if (stringArray.length > length) {
    commaString += ' (+' + (stringArray.length - length).toString() + ')';
  }
  return commaString;
}
