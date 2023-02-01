import { PunchStatus } from "@cc-components/punchshared";

export const punchStatusColors: Record<PunchStatus, string> = {
    'Cleared not verified': '#0084C4',
    Open: '#D9EAF2',
    Closed: '#4BB748',
};

export const punchStatusTextColors: Record<PunchStatus, string> = {
    'Cleared not verified': '#FFFFFF',
    Open: '#565656',
    Closed: '#FFFFFF',
};