import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import Workspace from '@equinor/workspace-fusion';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';

type WorkspaceWrapperProps = {
  contextId: string;
};

export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const pbi = usePBIOptions('tags-analytics', {
    column: 'ProjectName',
    table: 'Dim_ProjectMaster',
  });

  return (
    <Workspace
      workspaceOptions={{
        appKey: 'tagsapp',
        getIdentifier: () => '',
      }}
      powerBiOptions={pbi}
      modules={[powerBiModule]}
    />
  );
};
