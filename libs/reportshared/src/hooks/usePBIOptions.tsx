import { PowerBiConfig } from '@equinor/workspace-fusion/power-bi';
import { usePBIHelpers } from './usePbiHelpers';
import { useFusionContext } from './useContext';
import { ReportMeta } from '../components/ReportMeta';
import { ErrorComponent } from '../components/ErrorComponent/ErrorComponent';

export type Filters = {
  table: string;
  column: string;
};
/**
 *
 * @param reportUri - Report identifier
 * @param filters - Filters for dataset
 * @returns - PowerBiConfig
 */
export function usePBIOptions(reportUri: string, filters?: Filters): PowerBiConfig {
  const { getEmbed, getToken } = usePBIHelpers();
  const externalId = useFusionContext()?.externalId;

  return {
    getEmbed,
    getToken,
    filters: filters
      ? {
          values: [externalId ?? ''],
          target: { column: filters.column, table: filters.table },
        }
      : undefined,
    reportUri,
    ErrorComponent,
  };
}
