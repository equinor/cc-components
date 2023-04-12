import { jsx as _jsx } from "react/jsx-runtime";
import { configure, WorkspaceWrapper } from '@cc-components/preservationanalyticsapp';
import { makeComponent } from '@equinor/fusion-framework-react-app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useContextId } from '@cc-components/shared/hooks';
import { NoContext } from '@cc-components/shared/common';
const queryClient = new QueryClient();
const MyApp = () => {
    const contextId = useContextId();
    return (_jsx(StrictMode, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx("div", { style: { height: '100%', width: '100%', overflow: 'hidden' }, children: contextId ? _jsx(WorkspaceWrapper, { contextId: contextId }) : _jsx(NoContext, {}) }) }) }));
};
export default function render(el, args) {
    /** Create root from provided element */
    const root = createRoot(el);
    /** Make the app component
     * First argument is the main React component
     * Second argu is the the render args (framework and env variables)
     * Third argument is the configuration callback
     */
    const AppComponent = makeComponent(_jsx(MyApp, {}), args, configure);
    root.render(_jsx(AppComponent, {}));
    /** Teardown */
    return () => root.unmount();
}
