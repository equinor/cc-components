import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment } from 'react';
/**
 * Will recursively nest the providers you give it
 */
export function ContextProviders({ children, providers }) {
    return _jsx(_Fragment, { children: providers.length > 0 ? _jsx(ProviderHandler, { providers: providers, children: children }) : _jsx(_Fragment, { children: children }) });
}
function ProviderHandler({ providers, children }) {
    let isLast = false;
    // eslint-disable-next-line prefer-const
    let [Current, Next] = providers;
    if (!Next) {
        isLast = true;
        // eslint-disable-next-line react/jsx-no-useless-fragment
        Next = { name: 'Content', Component: () => _jsx(Fragment, { children: children }) };
    }
    return (_jsx(Current.Component, { children: _jsx(Next.Component, { children: !isLast && _jsx(ProviderHandler, { providers: providers.slice(1), children: children }) }) }, Current.name));
}
