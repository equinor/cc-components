import Workspace from '@equinor/workspace-fusion';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';
import { gardenConfig } from './gardenConfig';
import { useCallback } from 'react';
import { contextConfig } from './contextConfig';
import { responseParser } from './responseConfig';

const useContextId = () => {
  return '2d489afd-d3ec-43f8-b7ca-cf2de5f39a89';
};
export const WorkspaceWrapper = () => {
  const dataProxy = useHttpClient('data-proxy');
  const contextId = useContextId();
  const getResponseAsync = useCallback(async () => {
    const mcpkgs = await dataProxy.fetch(`/api/contexts/${contextId}/mc-pkgs`);
    return mcpkgs;
  }, [dataProxy, contextId]);

  return (
    <Workspace
      workspaceOptions={{
        appKey: 'MC',
        getIdentifier: (item) => item.mcPkgId,
        defaultTab: 'garden',
      }}
      filterOptions={filterConfig}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      statusBarOptions={statusBarConfig}
      fusionPowerBiOptions={{
        reportUri: 'pp-mc-analytics',
      }}
      dataOptions={{
        getResponseAsync,
        responseParser,
      }}
      contextOptions={contextConfig}
    />
  );
};
