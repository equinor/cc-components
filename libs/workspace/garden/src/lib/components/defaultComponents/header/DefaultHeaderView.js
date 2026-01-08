import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Typography } from '@equinor/eds-core-react';
const StyledHeaderContent = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 35px;
`;
const StyledCount = styled(Typography).withConfig({ displayName: 'cc-apps-' }) `
  color: ${tokens.colors.text.static_icons__default.hex};
  margin-left: 0.8em;
  font-weight: 300;
  color: inherit;
`;
const StyledHeaderText = styled(Typography).withConfig({ displayName: 'cc-apps-' }) `
  white-space: pre-line;
  font-weight: 500;
  color: inherit;
`;
const HeaderView = (props) => {
    const { header } = props;
    return (_jsxs(StyledHeaderContent, { children: [_jsx(StyledHeaderText, { variant: "h6", children: header.name }), _jsxs(StyledCount, { group: "navigation", variant: "label", children: ["(", header.count, ")"] })] }));
};
export const DefaultHeaderView = memo(HeaderView);
