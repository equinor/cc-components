import { HandoverPackage } from '@cc-components/handover/shared';

export const getProgressKey = (item: HandoverPackage) => `${item.progress || '0'}%`;
