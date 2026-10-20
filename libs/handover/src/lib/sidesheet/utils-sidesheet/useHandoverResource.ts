import { useContextId, usePackageResource } from '@cc-components/shared/hooks';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

import { useCallback } from 'react';
import {
  HandoverDetails,
  HandoverMcpkg,
  HandoverNCR,
  HandoverPunch,
  HandoverQuery,
  HandoverSWCR,
  HandoverUnsignedAction,
  HandoverUnsignedChecklist,
  HandoverUnsignedTask,
  HandoverWorkOrder,
  HandoverNotification
} from '../types';

export type HandoverResourceTypeMap = {
  mcpkg: HandoverMcpkg;
  'work-orders': HandoverWorkOrder;
  'unsigned-tasks': HandoverUnsignedTask;
  'unsigned-actions': HandoverUnsignedAction;
  'unsigned-checklists': HandoverUnsignedChecklist;
  punch: HandoverPunch;
  swcr: HandoverSWCR;
  details: HandoverDetails;
  ncr: HandoverNCR;
  query: HandoverQuery;
  notifications: HandoverNotification;
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
  const dataProxy = useHttpClient('cc-app');
  const contextId = useContextId();
  const getData = useCallback(
    async (id: string, signal?: AbortSignal) => {
      const result = await dataProxy.fetch(
        `api/contexts/${contextId}/handover/${id}/${packageType}`,
        { signal }
      );
      if (!result.ok) {
        throw new Error('Error fetching API');
      }
      return JSON.parse(await result.text()) as HandoverResourceTypeMap[T][];
    },
    [packageType, dataProxy, contextId]
  );

  const resource = usePackageResource(packageType, packageId, getData);

  return {
    data: resource.data,
    dataIsFetching: resource.isFetching,
    error: resource.error,
  };
};
