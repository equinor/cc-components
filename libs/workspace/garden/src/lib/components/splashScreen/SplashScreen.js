import { jsx as _jsx } from "react/jsx-runtime";
import { CircularProgress } from '@equinor/eds-core-react';
export function SplashScreen() {
    return (_jsx("div", { style: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsx(CircularProgress, { size: 48 }) }));
}
