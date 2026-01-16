import { useResizeObserver } from '../../hooks/useResizeObserver';
import { IReportEmbedConfiguration, Report } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { StyledReportRoot, StyledReportContainer } from '../powerbi.styles';
import { useAppInsights } from '@equinor/workspace-core';

const defaultAspectRatio = 0.41;

interface LoadedReportProps {
  config: IReportEmbedConfiguration;
  onReportReady?: (rep: Report) => void;
}
export const LoadedReport = ({ config, onReportReady }: LoadedReportProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width] = useResizeObserver(ref);
  const appInsights = useAppInsights();

  const initialRenderTimeRef = useRef<number | null>(null);

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

  return (
    <StyledReportRoot id={'reportRoot'} ref={ref}>
      <StyledReportContainer>
        <StyledAspectRatio width={width}>
          <PowerBiWrapper>
            <PowerBIEmbed
              cssClassName="pbiEmbed"
              embedConfig={config}
              getEmbeddedComponent={(embed) => {
                embed.on('loaded', () => {
                  onReportReady && onReportReady(embed as Report);
                });
                embed.off('rendered', trackReportLoadTime);
                embed.on('rendered', trackReportLoadTime);
              }}
            />
          </PowerBiWrapper>
        </StyledAspectRatio>
      </StyledReportContainer>
    </StyledReportRoot>
  );
};

const StyledAspectRatio = styled.div<{ width: number }>`
  height: ${({ width }) => `${defaultAspectRatio * width}px`};
  max-height: calc(100% - 5px);
`;

const PowerBiWrapper = styled.div.attrs({
  className: 'pbiEmbed',
})`
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
