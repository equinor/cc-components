import { createFusionWorkspace } from '@equinor/workspace-fusion';
import { WorkOrder } from '../types';
import { workorders } from './data';
import { filterConfig } from './filterConfig';
import { gardenConfig } from './gardenConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';

export const Workspace = createFusionWorkspace<WorkOrder>(
  { appKey: 'Workorder', getIdentifier: (item) => item.workOrderNumber },
  (config) =>
    config
      .addMiddleware((mediator) => (mediator.dataService.data = workorders))
      .addConfig({
        appColor: 'purple',
        appKey: 'Workorder',
        defaultTab: 'garden',
      })
      .addGrid(tableConfig)
      .addFilter(filterConfig)
      .addGarden(gardenConfig)
      .addStatusBarItems(statusBarConfig)
);
