import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@equinor/eds-core-react';
export const WorkspaceError = ({ error, resetErrorBoundary }) => {
    return (_jsxs("div", { children: [_jsxs("div", { children: ["An unknown error has occurred in the workspace", _jsx("div", { children: error.message }), _jsx("pre", { children: error?.stack })] }), _jsx(Button, { onClick: () => {
                    resetErrorBoundary();
                }, children: "Try again" })] }));
};
