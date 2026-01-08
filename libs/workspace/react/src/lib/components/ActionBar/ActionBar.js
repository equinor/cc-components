import { jsx as _jsx } from "react/jsx-runtime";
import { TabNavigation } from '../tabNavigation';
import { StyledActionBar } from './actionBar.styles';
export function ActionBar() {
    return (_jsx(StyledActionBar, { children: _jsx(TabNavigation, {}) }));
}
