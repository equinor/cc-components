import { useQuery } from '@tanstack/react-query';
import { CCApiUnauthorizedError } from '../error-boundary';

import { useFrameworkHttpClient } from '@equinor/fusion-framework-react/http';

type IHttpClient = ReturnType<typeof useFrameworkHttpClient>;

export function useCCApiAccessCheck(
  contextId: string,
  client: IHttpClient,
  resource: string
) {
  const { isLoading } = useQuery(
    ['auth', contextId],
    async ({ signal }) => {
      const res = await client.fetch(
        `/api/contexts/${contextId}/${resource}/is-authorized`,
        { signal }
      );

      if (res.status === 403 || res.status === 401) {
        throw new CCApiUnauthorizedError('');
      }
      const { result } = await res.json();
      if (!result) {
        throw new CCApiUnauthorizedError('');
      }
      if (res.ok === false) {
        throw new Error('Unknown error');
      }
      return result;
    },
    { useErrorBoundary: true }
  );

  return { isLoading };
}
