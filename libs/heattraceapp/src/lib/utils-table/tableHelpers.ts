import { CheckList } from 'libs/heattraceshared/dist/src';

export function getHTList(checkLists: CheckList[]): string[] {
  return checkLists.filter((x) => x.isHeatTrace).map((ht: CheckList) => ht.tagNo);
}
