import { useCallback } from 'react';
import { useContextId, usePackageResource } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { McNcr, McPunchItem, McWorkOrder } from '../types';
type McResourceTypeMap = {
  ncr: McNcr;
  'work-orders': McWorkOrder;
  punch: McPunchItem;
};
export const useMcResource = <T extends keyof McResourceTypeMap>(
  packageId: string,
  packageType: T
) => {
  const dataProxy = useHttpClient('data-proxy');
  const contextId = useContextId();
  const fetch = useCallback(
    async (id: string, signal?: AbortSignal) => {
      const result = await dataProxy.fetch(
        `api/contexts/${contextId}/mc-pkgs/${id}/${packageType}`,
        { signal }
      );

      return JSON.parse(await result.text()) as McResourceTypeMap[T][];
    },
    [dataProxy, contextId, packageType]
  );

  const resource = usePackageResource(packageType, packageId, fetch);

  return {
    data: resource.data,
    isFetching: resource.isFetching,
    error: resource.error,
  };
};
