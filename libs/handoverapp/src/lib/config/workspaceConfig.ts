import { createFusionWorkspace } from '@equinor/workspace-fusion';
import { filterConfig, statusBarConfig, tableConfig } from '.';
import { gardenConfig } from './gardenConfig';
import { HandoverPackage } from '../types';
import { data } from './data';

export const Workspace = createFusionWorkspace<HandoverPackage>(
  { appKey: 'Handover', getIdentifier: (item) => item.commpkgNo },
  (config) =>
    config
      .addMiddleware(
        (mediator) => (mediator.dataService.data = data as HandoverPackage[])
      )
      .addConfig({
        appColor: 'purple',
        appKey: 'Handover',
        defaultTab: 'grid',
      })
      .addGrid(tableConfig)
      .addFilter(filterConfig)
      .addGarden(gardenConfig)

      .addStatusBarItems(statusBarConfig)
);
