import Workspace from '@equinor/workspace-fusion';
import { gardenConfig } from './gardenConfig';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { SwcrPackage } from '../types';
import { sortPackagesByStatusAndNumber } from '../utils-statuses';
import { tableConfig } from './tableConfig';
import { useCallback } from 'react';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
const useContextId = () => {
  return '2d489afd-d3ec-43f8-b7ca-cf2de5f39a89';
};
export const WorkspaceWrapper = () => {
  const dataProxy = useHttpClient('data-proxy');
  const contextId = useContextId();
  const getResponseAsync = useCallback(async () => {
    const swcrs = await dataProxy.fetch(`/api/contexts/${contextId}/swcr`);
    return swcrs;
  }, [dataProxy, contextId]);

  const responseParser = async (response: Response) => {
    const parsedResponse = JSON.parse(await response.text()) as SwcrPackage[];
    return parsedResponse.sort(sortPackagesByStatusAndNumber);
  };

  return (
    <Workspace
      workspaceOptions={{
        appKey: 'SWCR',
        getIdentifier: (item) => item.swcrId,
      }}
      filterOptions={filterConfig}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      statusBarOptions={statusBarConfig}
      fusionPowerBiOptions={{
        reportUri: 'pp-swcr-analytics',
      }}
      dataOptions={{
        getResponseAsync,
        responseParser,
      }}
    />
  );
};
