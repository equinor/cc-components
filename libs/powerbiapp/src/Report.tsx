import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import { useContextId } from '@cc-components/shared';
import Workspace from '@equinor/workspace-fusion';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';

type WorkspaceWrapperProps = {
  reportId: string;
  column: string;
  table: string;
  appKey: string;
};

export const Report = ({ appKey, column, reportId, table }: WorkspaceWrapperProps) => {
  const contextId = useContextId();
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
