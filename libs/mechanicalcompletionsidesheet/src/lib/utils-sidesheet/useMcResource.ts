import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { McNcr, McPunchItem, McWorkOrder } from '../types';
import { useContextId } from '@cc-components/shared/hooks';
import { useQuery } from '@tanstack/react-query';

export const useNcr = (packageId: string | undefined) => {
  const dataProxy = useHttpClient('data-proxy');
  const contextId = useContextId();
  const { data, isLoading, error } = useQuery({
    queryFn: async (context) => {
      if (!packageId) throw Error('No ID given');
      const res = await dataProxy.fetch(
        `/api/contexts/${contextId}/mc-pkgs/${packageId}/ncr`,
        { signal: context.signal }
      );
      return (await res.json()) as McNcr[];
    },
    queryKey: ['MECHANICAL_COMPLETION', packageId, contextId, 'NCR'],
  });

  return {
    data,
    isFetching: isLoading,
    error,
  };
};

export const useMc = (packageId: string) => {
  const ccApi = useHttpClient('cc-api');
  const contextId = useContextId();
  const { data, isLoading, error } = useQuery({
    queryFn: async (context) => {
      const res = await ccApi.fetch(
        `/api/contexts/${contextId}/mc-pkgs/${packageId}/workorders`,
        { signal: context.signal }
      );
      return (await res.json()) as McWorkOrder[];
    },
    queryKey: ['MECHANICAL_COMPLETION', packageId, contextId, 'WORK_ORDERS'],
  });

  return {
    data,
    isFetching: isLoading,
    error,
  };
};

export const usePunch = (packageId: string) => {
  const ccApi = useHttpClient('cc-api');
  const contextId = useContextId();
  const { data, isLoading, error } = useQuery({
    queryFn: async (context) => {
      const res = await ccApi.fetch(
        `/api/contexts/${contextId}/mc-pkgs/${packageId}/punch`,
        { signal: context.signal }
      );
      return (await res.json()) as McPunchItem[];
    },
    queryKey: ['MECHANICAL_COMPLETION', packageId, contextId, 'PUNCH'],
  });

  return {
    data,
    isFetching: isLoading,
    error,
  };
};
