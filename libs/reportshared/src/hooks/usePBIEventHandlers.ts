import { useMemo } from 'react';
import { EventHandler } from '@equinor/workspace-fusion/power-bi';
import { useTrackFeature } from '@equinor/fusion-framework-react-app/analytics';

export enum PowerBIEmbedEvents {
  Loaded = 'loaded',
  Rendered = 'rendered',
  Error = 'error',
  ButtonClicked = 'buttonClicked',
  PageChanged = 'pageChanged',
  DataSelected = 'dataSelected',
}

export const usePBIEventHandlers = (reportId: string): Map<string, EventHandler> => {
  const trackFeature = useTrackFeature();

  return useMemo(
    () =>
      new Map<string, EventHandler>([
        [
          PowerBIEmbedEvents.Loaded,
          (event) => {
            trackFeature(`fusion-pbi:${PowerBIEmbedEvents.Loaded}`, {
              event: event?.detail,
              reportId,
            });
          },
        ],
        [
          PowerBIEmbedEvents.Rendered,
          (event) => {
            trackFeature(`fusion-pbi:${PowerBIEmbedEvents.Rendered}`, {
              event: event?.detail,
              reportId,
            });
          },
        ],
        [
          PowerBIEmbedEvents.Error,
          (event) => {
            trackFeature(`fusion-pbi:${PowerBIEmbedEvents.Error}`, {
              event: event?.detail,
              reportId,
            });
          },
        ],
        [
          PowerBIEmbedEvents.ButtonClicked,
          (event) => {
            trackFeature(`fusion-pbi:${PowerBIEmbedEvents.ButtonClicked}`, {
              event: event?.detail,
              reportId,
            });
          },
        ],
        [
          PowerBIEmbedEvents.PageChanged,
          (event) => {
            trackFeature(`fusion-pbi:${PowerBIEmbedEvents.PageChanged}`, {
              newPage: event?.detail?.newPage?.displayName,
              reportId,
            });
          },
        ],
        [
          PowerBIEmbedEvents.DataSelected,
          (event) => {
            trackFeature(`fusion-pbi:${PowerBIEmbedEvents.DataSelected}`, {
              dataPoints: event?.detail?.dataPoints,
              reportId,
            });
          },
        ],
      ]),
    [trackFeature, reportId]
  );
};
