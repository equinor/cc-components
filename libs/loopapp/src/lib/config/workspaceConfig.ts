import { createFusionWorkspace } from '@equinor/workspace-fusion';
import { Loop } from '../types';
import { filterConfig } from './filterConfig';
import { gardenConfig } from './gardenConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';

export const Workspace = createFusionWorkspace<Loop>(
  { appKey: 'Workorder', getIdentifier: (item) => item.checklistId },
  (config) =>
    config
      .addMiddleware((mediator) => (mediator.dataService.data = []))
      .addConfig({
        appColor: 'purple',
        appKey: 'Workorder',
        defaultTab: 'garden',
      })
      .addFilter(filterConfig)
      .addStatusBarItems(statusBarConfig)
      .addGarden(gardenConfig)
      .addGrid(tableConfig())
);
