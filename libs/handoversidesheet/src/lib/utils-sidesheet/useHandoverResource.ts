import { useContextId, usePackageResource } from '@cc-components/shared/hooks';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import {
  HandoverDetails,
  HandoverMcpkg,
  HandoverNCR,
  HandoverPunch,
  HandoverQuery,
  HandoverSWCR,
  HandoverUnsignedAction,
  HandoverUnsignedTask,
  HandoverWorkOrder,
} from '../types';

export type HandoverResourceTypeMap = {
  'mc-pkgs': HandoverMcpkg;
  workorders: HandoverWorkOrder;
  'unsigned-tasks': HandoverUnsignedTask;
  'unsigned-actions': HandoverUnsignedAction;
  punch: HandoverPunch;
  swcr: HandoverSWCR;
  details: HandoverDetails;
  query: HandoverQuery;
};

type UseHandoverResource<T extends keyof HandoverResourceTypeMap> = {
  data: HandoverResourceTypeMap[T][] | undefined;
  dataIsFetching: boolean;
  error: Error | null;
};

export const useHandoverResource = <T extends keyof HandoverResourceTypeMap>(
  packageId: string,
  packageType: T
): UseHandoverResource<T> => {
  const ccApi = useHttpClient('cc-api');
  const contextId = useContextId();
  const getData = useCallback(
    async (id: string, signal?: AbortSignal) => {
      const result = await ccApi.fetch(
        `api/contexts/${contextId}/handover/${id}/${packageType}`,
        { signal }
      );
      if (!result.ok) {
        throw new Error('Error fetching API');
      }
      return (await result.json()) as HandoverResourceTypeMap[T][];
    },
    [packageType, ccApi, contextId]
  );

  const resource = usePackageResource(packageType, packageId, getData);

  return {
    data: resource.data,
    dataIsFetching: resource.isFetching,
    error: resource.error,
  };
};

//TODO: Should be coming from CC API
export const useNcr = (packageId: string | undefined) => {
  const dataProxy = useHttpClient('data-proxy');
  const contextId = useContextId();
  const { data, isLoading, error } = useQuery<HandoverNCR[]>(
    ['NCR', packageId, contextId],
    {
      queryFn: async (ctx) => {
        const res = await dataProxy.fetch(
          `/api/contexts/${contextId}/handover/${packageId}/ncr`,
          {
            signal: ctx.signal,
          }
        );
        return res.json();
      },
    }
  );

  return {
    data,
    isLoading,
    error: error instanceof Error ? error : null,
  };
};
