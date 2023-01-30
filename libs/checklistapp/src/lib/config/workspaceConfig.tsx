import Workspace from '@equinor/workspace-fusion';
import { useContextTitle, usePBIHelpers } from '@cc-components/shared';

type WorkspaceWrapperProps = {
  contextId: string;
};

export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const { getEmbed, getToken } = usePBIHelpers();
  const title = useContextTitle();

  return (
    <Workspace
      workspaceOptions={{
        appKey: 'checklistapp',
        getIdentifier: () => '',
      }}
      powerBiOptions={{
        reportUri: 'checklist-analytics',
        getEmbed,
        getToken,
        filters: {
          values: [title ?? ''],
          target: { column: 'ProjectName', table: 'Dim_ProjectMaster' },
        },
      }}
    />
  );
};
