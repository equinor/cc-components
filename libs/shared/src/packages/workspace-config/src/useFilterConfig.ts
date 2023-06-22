import { FilterConfig } from '@equinor/workspace-fusion/filter';
import { filterMonospaceWhitelist } from '../../utils-formatting';

/**
 * Simplify workspace filter config
 * Pass a function that takes makes the request with a prefilled body
 *
 * ```
 * const client = useHttpClient();
 *
 *
 * const filterConfig = useFilterConfig(async (args) => client.fetch("/api/filter", args) )
 * ```
 */
export const useFilterConfig = (
  req: (init: RequestInit) => Promise<Response>
): FilterConfig => {
  return {
    styles: { monospaceGroups: filterMonospaceWhitelist },
    dataSource: {
      getFilterMeta: async (state, signal) => {
        const res = await req({
          body: JSON.stringify(state),
          signal,
          method: 'POST',
          headers: {
            ['content-type']: 'application/json',
          },
        });

        return res.json();
      },
    },
  };
};
