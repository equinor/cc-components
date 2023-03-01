import Workspace from '@equinor/workspace-fusion';
import { usePBIOptions } from '@cc-components/shared';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';

type WorkspaceWrapperProps = {
  contextId: string;
};

export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const pbi = usePBIOptions('ccoverview-analytics', {
    column: 'ProjectName',
    table: 'Dim_ProjectMaster',
  });

  return (
    <Workspace
      workspaceOptions={{
        appKey: 'overviewapp',
        getIdentifier: () => '',
      }}
      powerBiOptions={pbi}
      modules={[powerBiModule]}
    />
  );
};
