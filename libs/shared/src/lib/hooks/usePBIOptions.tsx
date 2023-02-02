import { PowerBiConfig } from '@equinor/workspace-fusion/power-bi';
import { useContextTitle } from './useContextTitle';
import { usePBIHelpers } from './usePBIHelpers';
import { ReportMeta } from '../components';

export type Filters = {
  table: string;
  column: string;
};
export function usePBIOptions(
  reportUri: string,
  reportName: string,
  filters?: Filters
): PowerBiConfig {
  const { getEmbed, getToken, getErrorMessage } = usePBIHelpers();
  const title = useContextTitle();
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
    ReportMetaData: (props) => <ReportMeta {...props} reportName={reportName} />,
    reportUri,
    //TODO: Return actual error
    getErrorMessage: async () => '',
  };
}
