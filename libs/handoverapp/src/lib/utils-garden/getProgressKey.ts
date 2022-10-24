import { HandoverPackage } from '../types';

export const getProgressKey = (item: HandoverPackage) => `${item.progress || '0'}%`;
