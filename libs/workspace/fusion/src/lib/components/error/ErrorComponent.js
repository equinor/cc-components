import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Icon, Typography, Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { error_outlined, file_description } from '@equinor/eds-icons';
import { useState } from 'react';
import styled from 'styled-components';
Icon.add({ error_outlined, file_description });
const StylesWrapper = styled.div `
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  justify-content: center;
`;
const StylesContentWrapper = styled.div `
  padding-top: 1rem;
`;
const getPortalMessageType = (type) => {
    switch (type) {
        case 'Error':
            return { color: tokens.colors.interactive.danger__resting.hex, icon: 'error_outlined' };
        case 'Info':
            return { color: tokens.colors.interactive.primary__resting.hex, icon: 'error_outlined' };
        case 'Warning':
            return { color: tokens.colors.interactive.warning__resting.hex, icon: 'error_outlined' };
        case 'NoContent':
            return { color: tokens.colors.text.static_icons__default.hex, icon: 'file_description' };
        default:
            return undefined;
    }
};
export function WorkspaceError({ title, icon = 'error_outlined', error, type, color, children, }) {
    const currentType = getPortalMessageType(type);
    const [showStack, setShowStack] = useState(false);
    return (_jsx(StylesWrapper, { children: _jsxs(_Fragment, { children: [_jsx(Icon, { size: 48, color: currentType?.color || color || tokens.colors.text.static_icons__tertiary.hex, name: currentType?.icon || icon }), _jsx(Typography, { color: currentType?.color || color || tokens.colors.text.static_icons__tertiary.hex, variant: "h1", children: title }), _jsxs(StylesContentWrapper, { children: [" ", children && children, " "] }), error && (_jsx(_Fragment, { children: showStack ? (_jsx("pre", { children: JSON.stringify(error, undefined, 4) })) : (_jsx(Button, { variant: "outlined", onClick: () => setShowStack(true), children: "Show stack" })) }))] }) }));
}
