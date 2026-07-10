import { useResizeObserver } from '../../hooks/useResizeObserver';
import { IReportEmbedConfiguration, Report } from 'powerbi-client';
import { PowerBIEmbed, EventHandler } from 'powerbi-client-react';
import { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { StyledReportRoot, StyledReportContainer } from '../powerbi.styles';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const defaultAspectRatio = 0.41;

interface LoadedReportProps {
  config: IReportEmbedConfiguration;
  onReportReady?: (rep: Report) => void;
  eventHandlers?: Map<string, EventHandler>;
}
export const LoadedReport = ({ config, onReportReady, eventHandlers }: LoadedReportProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width] = useResizeObserver(ref);
  const appInsights = (window as any).ai as ApplicationInsights | undefined;

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

  const mergedEventHandlers = useMemo(() => {
    const internal = new Map<string, EventHandler>([
      [
        'loaded',
        (_event, embeddedEntity) => {
          if (embeddedEntity) {
            onReportReady?.(embeddedEntity as Report);
          }
        },
      ],
      ['rendered', () => trackReportLoadTime()],
    ]);

    if (!eventHandlers) return internal;

    const merged = new Map<string, EventHandler>(internal);
    eventHandlers.forEach((handler, event) => {
      const existing = merged.get(event);
      if (existing && handler) {
        merged.set(event, (e, entity) => {
          existing(e, entity);
          handler(e, entity);
        });
      } else {
        merged.set(event, handler);
      }
    });
    return merged;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventHandlers, onReportReady, config]);

  return (
    <StyledReportRoot id={'reportRoot'} ref={ref}>
      <StyledReportContainer>
        <StyledAspectRatio width={width}>
          <PowerBiWrapper>
            <PowerBIEmbed
              cssClassName="pbiEmbed"
              embedConfig={config}
              eventHandlers={mergedEventHandlers}
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
