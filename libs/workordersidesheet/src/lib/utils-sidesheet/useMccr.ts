import { useContextId } from '@cc-components/shared/hooks';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useQuery } from '@tanstack/react-query';
import { WorkOrderMccr } from '../types';

const fetchMccr = async (
  ccClient: ReturnType<typeof useHttpClient>,
  contextId: string | undefined,
  packageId: string | null,
  signal?: AbortSignal
) => {
  const res = await ccClient.fetch(
    `/api/work-orders/checklists?contextId=${contextId}&workOrderId=${packageId}`,
    {
      signal,
    }
  );
  return (await res.json()) as WorkOrderMccr[];
};

export const useMccr = (packageId: string | null) => {
  const ccApp = useHttpClient('cc-app');
  const contextId = useContextId();

  const { data, isFetching, error } = useQuery({
    queryFn: (a) => fetchMccr(ccApp, contextId, packageId, a.signal),
    queryKey: ['mccr', packageId],
  });

  return {
    mccr: data?.filter(
      (wo, i, list) => i === list.findIndex((w) => w.tagNumber === wo.tagNumber)
    ),
    isFetching,
    error,
  };
};
