import { CheckList } from '@cc-components/pipingshared';

export function getHTList(checkLists: CheckList[]): string[] {
  return checkLists.filter((x) => x.isHeatTrace).map((ht: CheckList) => ht.tagNo);
}
