import { createFusionWorkspace } from '@equinor/workspace-fusion';
import { WorkOrder } from '../types';
import { workorders } from './data';
import { filterConfig } from './filterConfig';
import { gardenConfig } from './gardenConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';
import { IHttpClient } from '@equinor/fusion-framework-module-http';

export const Workspace = (httpClient: IHttpClient) => {
  return createFusionWorkspace<WorkOrder>(
    { appKey: 'Workorder', getIdentifier: (item) => item.workOrderNumber },
    (config) =>
      config
        .addDataSource({
          getResponseAsync: async () => {
            const wos = await httpClient.fetch(
              '/api/contexts/94dd5f4d-17f1-4312-bf75-ad75f4d9572c/work-orders'
            );
            console.log(wos);
            return wos;
          },
        })
        .addConfig({
          appColor: 'purple',
          appKey: 'Workorder',
          defaultTab: 'grid',
        })
        .addGrid(tableConfig)
        .addFilter(filterConfig)
        .addGarden(gardenConfig)
        .addStatusBarItems(statusBarConfig)
  );
};
