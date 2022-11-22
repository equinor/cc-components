import Workspace from '@equinor/workspace-fusion';
import { gardenConfig } from './gardenConfig';
import { tableConfig } from './tableConfig';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { useCallback } from 'react';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { contextConfig } from './contextConfig';
import { responseParser } from './responseConfig';

const useContextId = () => {
  return '2d489afd-d3ec-43f8-b7ca-cf2de5f39a89';
};
export const WorkspaceWrapper = () => {
  const dataProxy = useHttpClient('data-proxy');
  const contextId = useContextId();
  const getResponseAsync = useCallback(async () => {
    const commpkgs = await dataProxy.fetch(`/api/contexts/${contextId}/handover`);
    return commpkgs;
  }, [dataProxy, contextId]);

  return (
    <Workspace
      workspaceOptions={{
        appKey: 'Handover',
        getIdentifier: (item) => item.commpkgNo,
        defaultTab: 'garden',
      }}
      filterOptions={filterConfig}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      statusBarOptions={statusBarConfig}
      fusionPowerBiOptions={{
        reportUri: 'pp-handover-analytics',
      }}
      dataOptions={{
        getResponseAsync,
        responseParser,
      }}
      contextOptions={contextConfig}
    />
  );
};
