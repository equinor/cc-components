import Workspace from '@equinor/workspace-fusion';

type WorkspaceWrapperProps = {
  contextId: string;
};

export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  return (
    <Workspace
      workspaceOptions={{
        appKey: 'punchshared',
      }}
    />
  );
};
