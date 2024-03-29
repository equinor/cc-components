import { useContextId, usePackageResource } from '@cc-components/shared/hooks';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useCallback } from 'react';
import { McMccr, McNcr } from '../types';
import { PunchBase } from 'libs/shared/dist/src/packages/sidesheet/src/lib/sidesheet/tabs/punch/type';
import { WorkorderBase } from 'libs/shared/dist/src/packages/sidesheet/src/lib/sidesheet/tabs/workorder/types';
type McResourceTypeMap = {
  ncr: McNcr;
  'work-orders': WorkorderBase;
  punch: PunchBase;
  mccr: McMccr;
};
export const useMcResource = <T extends keyof McResourceTypeMap>(
  packageId: string,
  packageType: T
) => {
  const dataProxy = useHttpClient('cc-app');
  const contextId = useContextId();
  const fetch = useCallback(
    async (id: string, signal?: AbortSignal) => {
      const result = await dataProxy.fetch(
        `api/contexts/${contextId}/mechanical-completion/${id}/${packageType}`,
        { signal }
      );
      if (!result.ok) {
        throw new Error('Error fetching API');
      }
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
