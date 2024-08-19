import Workspace from '@equinor/workspace-fusion';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { useTableConfig } from './tableConfig';
import { useStatusBarConfig } from './statusBarConfig';
import {
  useContextId,
  useHttpClient,
  useCCApiAccessCheck,
  useWorkspaceBookmarks,
  usePBIOptions,
  useCloseSidesheetOnContextChange,
} from '@cc-components/shared';
import { useGardenConfig } from './gardenConfig';
import { sidesheetConfig } from './pipingSidesheet';
import { CCApiAccessLoading } from '@cc-components/sharedcomponents';

export const WorkspaceWrapper = () => {
  const contextId = useContextId();
  useCloseSidesheetOnContextChange();
  const client = useHttpClient();
  const { isLoading } = useCCApiAccessCheck(contextId, client, 'pipetest');
  const { bookmarkKey, currentBookmark, onBookmarkChange } = useWorkspaceBookmarks();

  const filterOptions = useFilterConfig((req) =>
    client.fetch(`/api/contexts/${contextId}/pipetest/filter-model`, req)
  );

  const tableConfig = useTableConfig(contextId);
  const statusBarConfig = useStatusBarConfig(contextId);
  const gardenConfig = useGardenConfig(contextId);

  const pbi = usePBIOptions('cc-pipetest-analytics', {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  });

  if (isLoading) {
    return <CCApiAccessLoading />;
  }

  return (
    <Workspace
      key={contextId + bookmarkKey}
      currentBookmark={currentBookmark}
      onBookmarkChange={onBookmarkChange}
      workspaceOptions={{
        getIdentifier: (pt) => pt.pipetestNo,
        defaultTab: 'grid',
      }}
      filterOptions={filterOptions}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      powerBiOptions={pbi}
      statusBarOptions={statusBarConfig}
      sidesheetOptions={sidesheetConfig}
      modules={[gridModule, gardenModule, powerBiModule]}
    />
  );
};
