import Workspace from '@equinor/workspace-fusion';
import { filterConfig } from './filterConfig';
import { gardenConfig } from './gardenConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';

export const WorkspaceWrapper = () => {
  return (
    <Workspace
      workspaceOptions={{
        appKey: 'Loop',
        getIdentifier: (item) => item.checklistId,
      }}
      filterOptions={filterConfig}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig()}
      statusBarOptions={statusBarConfig}
      fusionPowerBiOptions={{
        reportUri: 'pp-loop-analytics',
      }}
    />
  );
};
