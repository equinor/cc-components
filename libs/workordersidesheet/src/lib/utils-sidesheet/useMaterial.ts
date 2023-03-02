import { useContextId, usePackageResource } from '@cc-components/shared/hooks';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useCallback } from 'react';
import { WorkOrderMaterial } from '../types';

export const useMaterial = (
  packageId: string | null
): {
  material: WorkOrderMaterial[] | undefined;
  isFetching: boolean;
  error: Error | null;
} => {
  const dataProxy = useHttpClient('data-proxy');
  const contextId = useContextId();

  const fetch = useCallback(async (id: string, signal?: AbortSignal) => {
    const response = await dataProxy.fetch(
      `/api/contexts/${contextId}/work-orders/${packageId}/material`,
      {
        signal,
      }
    );

    return JSON.parse(await response.text()) as WorkOrderMaterial[];
  }, []);

  const resource = usePackageResource<WorkOrderMaterial>(
    'material',
    packageId || '',
    fetch
  );

  return {
    material: resource?.data?.filter(
      (wo, i, list) => i === list.findIndex((w) => w.itemNumber === wo.itemNumber)
    ),
    isFetching: resource.isFetching,
    error: resource.error,
  };
};
