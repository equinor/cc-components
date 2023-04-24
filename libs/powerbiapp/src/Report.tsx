import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import Workspace from '@equinor/workspace-fusion';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';

type WorkspaceWrapperProps = {
  /** Some reports are context independent */
  contextId?: string;
  reportId: string;
  column: string;
  table: string;
  appKey: string;
};

export const Report = ({
  contextId,
  appKey,
  column,
  reportId,
  table,
}: WorkspaceWrapperProps) => {
  const pbi = usePBIOptions(reportId, {
    column: column,
    table: table,
  });

  return (
    <Workspace
      key={contextId}
      workspaceOptions={{
        appKey: appKey,
        getIdentifier: () => '',
      }}
      powerBiOptions={pbi}
      modules={[powerBiModule]}
    />
  );
};
