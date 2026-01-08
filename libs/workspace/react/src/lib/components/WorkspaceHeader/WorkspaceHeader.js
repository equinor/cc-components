import { jsx as _jsx } from "react/jsx-runtime";
import { useActiveTab } from '../../hooks';
import { ActionBar } from '../ActionBar';
import styled from 'styled-components';
export function WorkspaceHeader() {
    const tab = useActiveTab();
    if (!tab || !tab.CustomHeader)
        return _jsx(ActionBar, {});
    return (_jsx(StyledWorkspaceHeader, { id: "workspace_header_wrapper", children: _jsx(tab.CustomHeader, {}) }));
}
const StyledWorkspaceHeader = styled.div `
  overflow: hidden;
  width: 100%;
  grid-row: 1;
  grid-column: 1 / span 2;
`;
