import Workspace from '@equinor/workspace-fusion';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { McPackage } from '../types';
import { sortPackagesByStatus } from '../utils-statuses/sortPackagesByStatus';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';
import { gardenConfig } from './gardenConfig';
import { useCallback } from 'react';

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

  const responseParser = async (response: Response) => {
    const parsedResponse = JSON.parse(await response.text()) as McPackage[];
    return parsedResponse.sort(sortPackagesByStatus);
  };

  return (
    <Workspace
      workspaceOptions={{
        appKey: 'MC',
        getIdentifier: (item) => item.mcPkgId,
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
    />
  );
};
