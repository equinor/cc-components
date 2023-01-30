import { PunchStatus } from "../types/punch";

const punchStatusTextColors: Record<PunchStatus, string> = {
    'Cleared not verified': '#FFFFFF',
    Open: '#565656',
    Closed: '#FFFFFF',
};

export const getPunchStatusTextColors = (status: PunchStatus): string =>
    punchStatusTextColors[status];