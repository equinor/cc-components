import { HandoverPackage } from '@cc-components/handovershared';

export const getProgressKey = (item: HandoverPackage) => `${item.progress || '0'}%`;
