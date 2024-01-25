import { Checklist } from '@cc-components/pipingshared';

export function getHTList(checkLists: Checklist[]): string[] {
  return checkLists.filter((x) => x.isHeatTrace).map((ht: Checklist) => ht.tagNo);
}
