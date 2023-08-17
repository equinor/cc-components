import { useContextId, useHttpClient } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { WorkOrderCutoff } from '../types/workOrderCutoff';

const fetchCutoff = async (
  ccClient: ReturnType<typeof useHttpClient>,
  contextId: string | undefined,
  packageId: string | null,
  signal?: AbortSignal
) => {
  const res = await ccClient.fetch(
    `/api/contexts/${contextId}/work-orders/${packageId}/cutoff`,
    {
      signal,
    }
  );

  if (!res.ok) {
    throw new Error('failed to fetch cutoff');
  }

  return (await res.json()) as WorkOrderCutoff[];
};
export const useCutoff = (packageId: string | null) => {
  const ccApp = useHttpClient();
  const contextId = useContextId();

  const { data, isLoading, error } = useQuery({
    queryFn: (a) => fetchCutoff(ccApp, contextId, packageId, a.signal),
    queryKey: ['cutoff', packageId],
    useErrorBoundary: false,
  });
  return {
    //Rip performance
    data,
    isLoading,
    error,
  };
};
