import { FilterConfig } from '@equinor/workspace-fusion/filter';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

export const useFilterConfig = (contextId: string): FilterConfig => {
  const client = useHttpClient('cc-app');

  return {
    dataSource: {
      getFilterMeta: async (state, signal) => {
        const res = await client.fetch(
          `/api/contexts/${contextId}/work-orders/filter-model`,
          {
            body: JSON.stringify(state),
            signal,
            method: 'POST',
            headers: {
              ['content-type']: 'application/json',
            },
          }
        );
        return res.json();
      },
    },
  };
};

export const filterConfig = {};
