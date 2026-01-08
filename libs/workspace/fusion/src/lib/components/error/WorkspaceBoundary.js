import { jsx as _jsx } from "react/jsx-runtime";
import { ErrorBoundary } from 'react-error-boundary';
import { WorkspaceError } from './WorkspaceError';
export const WorkspaceBoundary = ({ children }) => {
    return _jsx(ErrorBoundary, { FallbackComponent: WorkspaceError, children: children });
};
