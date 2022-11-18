import Workspace from '@equinor/workspace-fusion';
import { filterConfig } from './filterConfig';
import { gardenConfig } from './gardenConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';

export const WorkspaceWrapper = () => {
  return (
    <Workspace
      workspaceOptions={{
        appKey: 'Workorder',
        getIdentifier: (item) => item.workOrderNumber,
      }}
      filterOptions={filterConfig}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      statusBarOptions={statusBarConfig}
    />
  );
};
