import { useQuery } from '@tanstack/react-query';
import { CCApiUnauthorizedError } from '../error-boundary';

import { IHttpClient } from '@equinor/fusion-framework-react/http';

export function useCCApiAccessCheck(
  contextId: string,
  client: IHttpClient,
  resource: string
) {
  const { isLoading } = useQuery({
    queryKey: ['auth', contextId],
    queryFn: async ({ signal }) => {
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
    throwOnError: true,
  });

  return { isLoading };
}
