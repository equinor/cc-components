import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, useRef } from 'react';
import { Loading } from './loading';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import { Icon } from '@equinor/eds-core-react';
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Report } from './report/Report';
import { factories, service } from 'powerbi-client';
import styled from 'styled-components';
Icon.add({ chevron_down, chevron_up });
const client = new QueryClient();
export const PowerBi = (props) => {
    const { reportUri, ErrorComponent } = props;
    return (_jsxs(QueryClientProvider, { client: client, children: [_jsx(PowerBiBootstrap, {}), _jsx(Suspense, { fallback: _jsx(Loading, {}), children: _jsx(QueryErrorResetBoundary, { children: ({ reset }) => (_jsx(ErrorBoundary, { onReset: reset, FallbackComponent: (errorProps) => _jsx(ErrorComponent, { ...errorProps, reportUri: reportUri }), children: _jsx(Report, { ...props }) })) }) })] }));
};
const StyledPowerBiBootstrap = styled.div `
  visbility: hidden;
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
`;
/**
 * Initializes preloading of iframe javascript resources
 */
function PowerBiBootstrap() {
    const isBootstrapped = useRef(false);
    return (_jsx(StyledPowerBiBootstrap, { id: "pbi-bootstrap", ref: (ref) => {
            if (!ref || isBootstrapped.current == true)
                return;
            new service.Service(factories.hpmFactory, factories.wpmpFactory, factories.routerFactory).bootstrap(ref, {
                embedUrl: 'https://app.powerbi.com/reportEmbed',
                type: 'report',
                settings: {
                    panes: {
                        filters: {
                            expanded: false,
                            visible: false,
                        },
                        pageNavigation: {
                            visible: false,
                        },
                    },
                },
                tokenType: 1,
            });
            isBootstrapped.current = true;
        } }));
}
