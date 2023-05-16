import Workspace from '@equinor/workspace-fusion';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { tableConfig } from './tableConfig';

type WorkspaceWrapperProps = {
  contextId: string;
};

export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  return (
    <Workspace
      workspaceOptions={{
        appKey: 'pipingapp',
        getIdentifier: () => '',
      }}
      gridOptions={tableConfig}
      modules={[gridModule]}
    />
  );
};
