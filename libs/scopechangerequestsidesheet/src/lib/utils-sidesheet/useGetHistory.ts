import { WorkorderBase, useContextId, useHttpClient } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { LogEntry } from 'libs/scopechangerequestshared/dist/src';

export const useGetHistory = (scopeChangeRequestId: string) => {
  const client = useHttpClient();
  const contextId = useContextId();
  const { data, isLoading, error } = useQuery<LogEntry[], Error>(
    ['scope-change-request', scopeChangeRequestId, 'logs'],
    async ({ signal }) => {
      const response = await client.fetch(
        `/api/scope-change-requests/${scopeChangeRequestId}/history`,

        { signal, headers: { ['x-fusion-context-id']: contextId } }
      );
      if (response.status === 204) {
        return null;
      }
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    }
  );

  return {
    dataHistory: data,
    isLoadingHistory: isLoading,
    errorHistory: error,
  };
};
