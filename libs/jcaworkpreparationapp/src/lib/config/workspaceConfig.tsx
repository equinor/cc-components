import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import Workspace from '@equinor/workspace-fusion';

type WorkspaceWrapperProps = {
  contextId: string;
};

export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const pbi = usePBIOptions('pp-work-preparation', {
    column: 'ProjectName',
    table: 'Dim_ProjectMaster',
  });

  return (
    <Workspace
      workspaceOptions={{
        appKey: 'jcaworkpreparationapp',
        getIdentifier: () => '',
      }}
      powerBiOptions={pbi}
    />
  );
};
