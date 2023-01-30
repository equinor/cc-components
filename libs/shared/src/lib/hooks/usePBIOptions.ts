import { PowerBiConfig } from '@equinor/workspace-fusion/power-bi';
import { useContextTitle } from './useContextTitle';
import { usePBIHelpers } from './usePBIHelpers';

export type Filters = {
  table: string;
  column: string;
};
export function usePBIOptions(reportUri: string, filters?: Filters): PowerBiConfig {
  const { getEmbed, getToken } = usePBIHelpers();
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
    reportUri,
  };
}
