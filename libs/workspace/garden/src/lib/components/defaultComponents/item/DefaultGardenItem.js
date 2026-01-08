import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { StyledDefaultPackage } from './defaultGardenItem.styles';
import { Typography } from '@equinor/eds-core-react';
const GardenItem = ({ columnExpanded, isSelected, depth, onClick, color, description, displayName, }) => {
    return (_jsxs(StyledDefaultPackage, { bgColor: color, onClick: onClick, isSelected: isSelected, depth: depth ?? 0, children: [_jsx(Typography, { as: 'span', title: displayName, children: displayName }), columnExpanded && _jsx("div", { children: description })] }));
};
export const DefaultGardenItem = memo(GardenItem);
