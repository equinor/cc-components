import { jsx as _jsx } from "react/jsx-runtime";
import { WorkspaceTab } from '../workspaceTab';
import { StyledWorkspaceBody } from './workspaceBody.styles';
export function WorkspaceBody() {
    return (_jsx(StyledWorkspaceBody, { id: 'workspace_body', children: _jsx(WorkspaceTab, {}) }));
}
