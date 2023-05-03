import { PowerBiConfig } from '@equinor/workspace-fusion/power-bi';
import { ReportMeta } from './ReportMeta';
import { usePBIHelpers } from './usePBIHelpers';
import { useContextCvpId } from '../../../hooks/src/lib/useContextTitle';

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
  const { getEmbed, getToken, getErrorMessage } = usePBIHelpers();
  const title = useContextCvpId();

  return {
    getEmbed,
    getToken,
    filters: filters
      ? {
          values: [title ?? ''],
          target: { column: filters.column, table: filters.table },
        }
      : undefined,
    getErrorMessage,
    ReportMetaData: (props) => <ReportMeta {...props} />,
    reportUri,
  };
}
