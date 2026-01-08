import { jsx as _jsx } from "react/jsx-runtime";
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { PowerBIEmbed } from 'powerbi-client-react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { StyledReportRoot, StyledReportContainer } from '../powerbi.styles';
const defaultAspectRatio = 0.41;
export const LoadedReport = ({ config, onReportReady }) => {
    const ref = useRef(null);
    const [width] = useResizeObserver(ref);
    const appInsights = window.ai;
    const initialRenderTimeRef = useRef(null);
    useEffect(() => {
        initialRenderTimeRef.current = Date.now();
    }, [config]);
    function trackReportLoadTime() {
        if (initialRenderTimeRef.current) {
            const reportReadyTime = Date.now();
            const timeDifference = reportReadyTime - initialRenderTimeRef.current;
            appInsights?.trackEvent({
                name: 'PowerBI Report Rendered',
                properties: {
                    loadTime: timeDifference,
                    embedUrl: config.embedUrl,
                },
            });
        }
    }
    return (_jsx(StyledReportRoot, { id: 'reportRoot', ref: ref, children: _jsx(StyledReportContainer, { children: _jsx(StyledAspectRatio, { width: width, children: _jsx(PowerBiWrapper, { children: _jsx(PowerBIEmbed, { cssClassName: "pbiEmbed", embedConfig: config, getEmbeddedComponent: (embed) => {
                            embed.on('loaded', () => {
                                onReportReady && onReportReady(embed);
                            });
                            embed.off('rendered', trackReportLoadTime);
                            embed.on('rendered', trackReportLoadTime);
                        } }) }) }) }) }));
};
const StyledAspectRatio = styled.div `
  height: ${({ width }) => `${defaultAspectRatio * width}px`};
  max-height: calc(100% - 5px);
`;
const PowerBiWrapper = styled.div.attrs({
    className: 'pbiEmbed',
}) `
  height: 100%;
  width: 100%;

  .pbiEmbed {
    height: 100%;
    width: 100%;
  }

  .pbiEmbed > iframe {
    border: 0;
    width: 100%;
    height: 100%;
  }
`;
