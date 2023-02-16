import { Punch } from "@cc-components/punchshared";

export type MaterialStatus = 'Yes' | 'No';

export const getMaterialRequired = (punch: Punch): MaterialStatus => {
    if (punch.materialRequired) return 'Yes';
    return 'No';
};

export const getHasWO = (item: Punch): MaterialStatus => {
    if (item.hasWO) return 'Yes';
    return 'No';
};