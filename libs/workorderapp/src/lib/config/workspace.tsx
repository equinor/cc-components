import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import Workspace from '@equinor/workspace-fusion';
import { useCallback } from 'react';
import { filterConfig } from './filterConfig';
import { gardenConfig } from './gardenConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';
type WorkspaceWrapperProps = {
  contextId: string;
};
export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const dataProxy = useHttpClient('data-proxy');
  const getResponseAsync = useCallback(
    async (signal: AbortSignal | undefined) => {
      const wos = await dataProxy.fetch(`/api/contexts/${contextId}/work-orders`, {
        signal,
      });
      return wos;
    },
    [contextId, dataProxy]
  );
  return (
    <Workspace
      workspaceOptions={{
        appKey: 'Workorder',
        getIdentifier: (item) => item.workOrderNumber,
        defaultTab: 'garden',
      }}
      filterOptions={filterConfig}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      statusBarOptions={statusBarConfig}
      dataOptions={{
        getResponseAsync,
      }}
    />
  );
};
