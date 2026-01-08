import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { StyledSubGroup, StyledSubGroupText, StyledCount } from './subGroup.styles';
import { memo } from 'react';
const GardenGroupView = ({ data, onClick, onGroupeSelect, }) => {
    // const width = isSubGroup(data) ? 100 - data.depth * 3 : 100;
    const width = 100;
    return (_jsxs(StyledSubGroup, { onClick: onClick, style: { width: `${width}%` }, children: [_jsxs(StyledSubGroupText, { children: [_jsx("div", { onClick: () => onGroupeSelect && onGroupeSelect(data), children: data.columnName }), _jsxs(StyledCount, { children: ["(", data.totalItemsCount, ")"] })] }), _jsx(Icon, { name: false ? 'chevron_up' : 'chevron_down', color: tokens.colors.interactive.primary__resting.hex })] }));
};
export const DefaultGroupView = memo(GardenGroupView);
