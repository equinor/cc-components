import { createFusionWorkspace } from '@equinor/workspace-fusion';
import { gardenConfig } from './gardenConfig';
import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { SwcrPackage } from '../types';
import { sortPackagesByStatusAndNumber } from '../utils-statuses';
import { tableConfig } from './tableConfig';
export const createWorkspace = (httpClient: IHttpClient) => {
  return createFusionWorkspace<SwcrPackage>(
    { appKey: 'SWCR', getIdentifier: (item) => item.swcrNo },
    (config) =>
      config
        .addConfig({
          appColor: 'purple',
          appKey: 'SWCR',
          defaultTab: 'grid',
        })
        .addDataSource({
          getResponseAsync: async () => {
            const handovers = await httpClient.fetch(
              `/api/contexts/2d489afd-d3ec-43f8-b7ca-cf2de5f39a89/swcr`
            );
            return handovers;
          },
          responseParser: async (response: Response) => {
            const parsedResponse = JSON.parse(await response.text()) as SwcrPackage[];
            return parsedResponse.sort(sortPackagesByStatusAndNumber);
          },
        })
        .addGrid(tableConfig)
        .addFilter(filterConfig)
        .addGarden(gardenConfig)

        .addStatusBarItems(statusBarConfig)
        .addFusionPowerBI({
          reportUri: 'pp-swcr-analytics',
        })
  );
};
