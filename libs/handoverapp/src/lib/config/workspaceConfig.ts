import { createFusionWorkspace } from '@equinor/workspace-fusion';
import { gardenConfig } from './gardenConfig';
import { HandoverPackage } from '../types';
import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { tableConfig } from './tableConfig';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { sortPackagesByStatus } from '../utils-statuses/sortPackagesByStatus';

export const createWorkspace = (httpClient: IHttpClient) => {
  return createFusionWorkspace<HandoverPackage>(
    { appKey: 'Handover', getIdentifier: (item) => item.commpkgNo },
    (config) =>
      config
        .addConfig({
          appColor: 'purple',
          appKey: 'Handover',
          defaultTab: 'grid',
        })
        .addDataSource({
          getResponseAsync: async () => {
            const handovers = await httpClient.fetch(
              `/api/contexts/94dd5f4d-17f1-4312-bf75-ad75f4d9572c/handover`
            );
            return handovers;
          },
          responseParser: async (response: Response) => {
            const parsedResponse = JSON.parse(await response.text()) as HandoverPackage[];
            return parsedResponse.sort(sortPackagesByStatus);
          },
        })
        .addGrid(tableConfig)
        .addFilter(filterConfig)
        .addGarden(gardenConfig)

        .addStatusBarItems(statusBarConfig)
        .addFusionPowerBI({
          reportUri: 'pp-handover-analytics',
        })
  );
};
