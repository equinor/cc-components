import { FilterConfig } from '@equinor/workspace-fusion/filter';
import { filterMonospaceWhitelist } from '../../utils-formatting';
import { useContextId } from '../../hooks';

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
  req: (init: RequestInit) => Promise<Response>,
  descriptionReq?: (init: RequestInit) => Promise<Response>
): FilterConfig => {
  const contextId = useContextId();
  return {
    dataSource: {
      getFilterMeta: async (state, signal) => {
        const res = await req({
          body: JSON.stringify(state),
          signal,
          method: 'POST',
          headers: {
            ['content-type']: 'application/json',
            ['x-fusion-context-id']: contextId,
          },
        });

        return res.json();
      },

      getDescriptionMeta: async (descriptionIdentifiers, signal) => {
        if (!descriptionReq) {
          return {};
        }
        const res = await descriptionReq({
          method: 'POST',
          signal,
          body: JSON.stringify(descriptionIdentifiers),
          headers: {
            ['content-type']: 'application/json',
            ['x-fusion-context-id']: contextId,
          },
        });
        return res.json();
      },
    },
  };
};
