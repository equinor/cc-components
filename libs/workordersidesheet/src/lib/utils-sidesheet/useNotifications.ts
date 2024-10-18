import { useContextId, useHttpClient } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { WorkOrderNotification } from '../types';

export const useNotifications = (workOrderId: string) => {
  const client =  useHttpClient();
  const contextId = useContextId();

  const { data, isFetching, error } = useQuery<WorkOrderNotification[], Error>({
    queryKey: ['workOrder','notification', workOrderId],
    queryFn: async({ signal }) => {
        const response = await client.fetch(`/api/contexts/${contextId}/work-orders/${workOrderId}/notifications`, { signal });

        if (!response.ok) {
          throw new Error('Failed to get notifications', { cause: response });
        }

        return response.json();
    },
  });

    return { data, isFetching, error };
};
