import Workspace from '@equinor/workspace-fusion';
import { filterConfig } from './filterConfig';
import { gardenConfig } from './gardenConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';

type WorkspaceWrapperProps = {
  contextId: string;
};

export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  return (
    <Workspace
      workspaceOptions={{
        appKey: 'Loop',
        getIdentifier: (item) => item.checklistId,
        defaultTab: 'grid',
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
