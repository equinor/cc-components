import { useMemo } from 'react';
import { EventHandler } from '@equinor/workspace-fusion/power-bi';
import { useTrackFeature } from '@equinor/fusion-framework-react-app/analytics';

/**
 * Power BI embed event names.
 *
 * Values MUST match `equinor/fusion-core-apps` `pbi-template` (`PowerBIEmbedEvents`)
 * so tracked features stay consistent across Fusion apps.
 */
export enum PowerBIEmbedEvents {
  Loaded = 'loaded',
  Rendered = 'rendered',
  Error = 'error',
  ButtonClicked = 'buttonClicked',
  PageChanged = 'pageChanged',
  DataSelected = 'dataSelected',
}

/**
 * Builds the Power BI embed event handler map that reports user interactions to the
 * Fusion analytics module via `useTrackFeature`.
 *
 * Mirrors `fusion-core-apps/apps/pbi-template` — feature name is `fusion-pbi:<event>`
 * and payloads match that implementation for cross-app consistency.
 *
 * `useTrackFeature` no-ops safely when no analytics provider is configured, so this is
 * safe to attach unconditionally; the Fusion portal supplies the provider at runtime.
 *
 * @param reportId - The report identifier included in every tracked event.
 * @returns A `Map<string, EventHandler>` to pass to the workspace `powerBiOptions.eventHandlers`.
 */
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
