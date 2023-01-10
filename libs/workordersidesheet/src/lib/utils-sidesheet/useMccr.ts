import { useContextId, usePackageResource } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useCallback } from 'react';
import { WorkOrderMccr } from '../types';

export const useMccr = (
  packageId: string | null
): { mccr: WorkOrderMccr[] | undefined; isFetching: boolean; error: Error | null } => {
  const dataProxy = useHttpClient('data-proxy');
  const contextId = useContextId();

  const fetch = useCallback(async (id: string, signal?: AbortSignal) => {
    const response = await dataProxy.fetch(
      `/api/contexts/${contextId}/work-orders/${packageId}/mccr`,
      {
        signal,
      }
    );
    return JSON.parse(await response.text()) as WorkOrderMccr[];
  }, []);

  const resource = usePackageResource('mccr', packageId || '', fetch);

  return {
    mccr: resource?.data?.filter(
      (wo, i, list) => i === list.findIndex((w) => w.tagNumber === wo.tagNumber)
    ),
    isFetching: resource.isFetching,
    error: resource.error,
  };
};
