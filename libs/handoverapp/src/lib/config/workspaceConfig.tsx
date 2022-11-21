import Workspace from '@equinor/workspace-fusion';
import { gardenConfig } from './gardenConfig';
import { HandoverPackage } from '../types';
import { tableConfig } from './tableConfig';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { sortPackagesByStatus } from '../utils-statuses/sortPackagesByStatus';
import { useCallback } from 'react';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useContextId } from '@cc-components/shared';

export const WorkspaceWrapper = () => {
  const dataProxy = useHttpClient('data-proxy');
  const contextId = useContextId();
  const getResponseAsync = useCallback(async () => {
    const commpkgs = await dataProxy.fetch(`/api/contexts/${contextId}/handover`);
    return commpkgs;
  }, [dataProxy, contextId]);

  const responseParser = async (response: Response) => {
    const parsedResponse = JSON.parse(await response.text()) as HandoverPackage[];
    return parsedResponse.sort(sortPackagesByStatus);
  };

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
    />
  );
};
