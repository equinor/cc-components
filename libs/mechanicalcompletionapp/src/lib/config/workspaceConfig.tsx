import { createFusionWorkspace } from '@equinor/workspace-fusion';
import { IHttpClient } from '@equinor/fusion-framework-react-app/http';
import { McPackage } from '../types';
import { sortPackagesByStatus } from '../utils-statuses/sortPackagesByStatus';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';
import { gardenConfig } from './gardenConfig';

export const createWorkspace = (httpClient: IHttpClient) => {
  return createFusionWorkspace<McPackage>(
    { appKey: 'MC', getIdentifier: (item) => item.mcPkgId },
    (config) =>
      config
        .addConfig({
          appColor: 'purple',
          appKey: 'MC',
          defaultTab: 'grid',
        })
        .addDataSource({
          getResponseAsync: async () => {
            const mcpkgs = await httpClient.fetch(
              `/api/contexts/94dd5f4d-17f1-4312-bf75-ad75f4d9572c/mc-pkgs`
            );
            return mcpkgs;
          },
          responseParser: async (response: Response) => {
            const parsedResponse = JSON.parse(await response.text()) as McPackage[];
            return parsedResponse.sort(sortPackagesByStatus);
          },
        })
        .addGrid(tableConfig)
        .addFilter(filterConfig)
        .addGarden(gardenConfig)
        .addStatusBarItems(statusBarConfig)
        .addFusionPowerBI({
          reportUri: 'pp-mc-analytics',
        })
  );
};
