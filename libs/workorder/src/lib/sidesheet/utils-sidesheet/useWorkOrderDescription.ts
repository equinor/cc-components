import { useContextId, useHttpClient } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { WorkOrderDescription } from '../types';

export const useWorkOrderDescription = (workOrderId: string) => {
  const client =  useHttpClient();
  const contextId = useContextId();

  const { data, isFetching, error } = useQuery<WorkOrderDescription, Error>({
    queryKey: ['workOrder', workOrderId, 'description'],
    queryFn: async({ signal }) => {
        const response = await client.fetch(`/api/contexts/${contextId}/work-orders/${workOrderId}/description`, { signal });

        if (!response.ok) {
          throw new Error('Failed to get notifications', { cause: response });
        }

        return response.json();
    },
  });

    return { data, isFetching, error };
};
