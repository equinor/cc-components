import { useFramework } from '@equinor/fusion-framework-react-app/framework';
import { useQuery } from '@tanstack/react-query';
import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { RelationReturnType, RelationsTypes } from '../types/relations';

export async function getContextRelations<RT extends RelationsTypes>(
  client: IHttpClient,
  contextId?: string,
  signal?: AbortSignal
): Promise<RelationReturnType<RT>[] | undefined> {
  if (!contextId) return;
  const res = await client.fetch(`/contexts/${contextId}/relations`, { signal });
  if (!res.ok) throw res;
  return (await res.json()) as RelationReturnType<RT>[];
}

import { UseQueryResult } from '@tanstack/react-query';

export const useContextRelationsQuery = <RT extends RelationsTypes>(
  contextId?: string
): UseQueryResult<RelationReturnType<RT>[] | undefined> => {
  const client = useFramework().modules.serviceDiscovery.createClient('context');

  return useQuery({
    queryKey: ['context-relations', contextId],
    queryFn: async ({ signal }) =>
      getContextRelations<RT>(await client, contextId, signal),
    enabled: Boolean(contextId),
  });
};
