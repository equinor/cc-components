import Workspace from '@equinor/workspace-fusion';
import { usePBIOptions } from '@cc-components/shared';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';

type WorkspaceWrapperProps = {
  contextId: string;
};

export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const pbi = usePBIOptions('pp-spools-analytics', {
    //Dim_ProjectMaster does not exist in Report. data will show up for all projects if app is visible for project and user have access
    column: 'ProjectName',
    table: 'Dim_ProjectMaster',
  });

  return (
    <Workspace
      workspaceOptions={{
        appKey: 'jcaspoolsapp',
        getIdentifier: () => '',
      }}
      powerBiOptions={pbi}
      modules={[powerBiModule]}
    />
  );
};
