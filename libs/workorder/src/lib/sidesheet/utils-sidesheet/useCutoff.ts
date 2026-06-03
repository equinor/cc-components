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
  const data = (await res.json()) as WorkOrderCutoff[];
  const cutoffs: WorkOrderCutoff[] = [];
  let current = '';
  data.forEach((v, i, a) => {
    const value = cutoffToString(v);

    if (value !== current) {
      cutoffs.push(v);
      current = value;
    }
  });
  return cutoffs;
};
export const useCutoff = (packageId: string | null) => {
  const ccApp = useHttpClient();
  const contextId = useContextId();

  const { data, isLoading, error } = useQuery({
    queryFn: (a) => fetchCutoff(ccApp, contextId, packageId, a.signal),
    queryKey: ['cutoff', packageId],
    throwOnError: false,
  });
  return {
    data,
    isLoading,
    error,
  };
};

function cutoffToString(wo: WorkOrderCutoff) {
  const value: WorkOrderCutoff = {
    ...wo,
    sourceIdentity: '',
    updatedDate: '',
    cutoffDate: '',
    cutoffWeek: '',
  };

  return JSON.stringify(value);
}
