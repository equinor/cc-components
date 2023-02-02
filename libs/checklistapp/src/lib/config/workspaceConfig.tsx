import Workspace from '@equinor/workspace-fusion';
import { usePBIOptions } from '@cc-components/shared';

type WorkspaceWrapperProps = {
  contextId: string;
};

export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const pbi = usePBIOptions('checklist-analytics', 'Checklist Analytics', {
    column: 'ProjectName',
    table: 'Dim_ProjectMaster',
  });

  return (
    <Workspace
      workspaceOptions={{
        appKey: 'checklistapp',
        getIdentifier: () => '',
      }}
      powerBiOptions={pbi}
    />
  );
};
