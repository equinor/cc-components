import { useContextId } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useQuery } from '@tanstack/react-query';
import { WorkOrderMaterial } from '../types';

const fetchMaterials = async (
  ccClient: ReturnType<typeof useHttpClient>,
  contextId: string | undefined,
  packageId: string | null,
  signal?: AbortSignal
) => {
  const res = await ccClient.fetch(
    `/api/contexts/${contextId}/work-orders/${packageId}/materials`,
    {
      signal,
    }
  );

  if (!res.ok) {
    throw new Error('failed to fetch materials');
  }

  return (await res.json()) as WorkOrderMaterial[];
};
export const useMaterial = (packageId: string | null) => {
  const ccApp = useHttpClient('cc-app');
  const contextId = useContextId();

  const { data, isFetching, error } = useQuery({
    queryFn: (a) => fetchMaterials(ccApp, contextId, packageId, a.signal),
    queryKey: ['material', packageId],
    throwOnError: false,
  });
  return {
    material: data?.filter(
      (wo, i, list) => i === list.findIndex((w) => w.itemNumber === wo.itemNumber)
    ),
    isFetching,
    error,
  };
};
