import { usePBIOptions } from '@cc-components/shared/hooks';
import Workspace from '@equinor/workspace-fusion';

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
    />
  );
};
