import Workspace from '@equinor/workspace-fusion';
import { usePBIOptions } from '@cc-components/shared';

type WorkspaceWrapperProps = {
  contextId: string;
};

export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const pbi = usePBIOptions('query-analytics', {
    column: 'ProjectName',
    table: 'Dim_ProjectMaster',
  });

  return (
    <Workspace
      workspaceOptions={{
        appKey: 'queryapp',
        getIdentifier: () => '',
      }}
      powerBiOptions={pbi}
    />
  );
};
