import { PunchStatus } from "../types/punch";

const punchStatusColors: Record<PunchStatus, string> = {
    'Cleared not verified': '#0084C4',
    Open: '#D9EAF2',
    Closed: '#4BB748',
};

export const getPunchStatusColors = (status: PunchStatus): string => punchStatusColors[status];