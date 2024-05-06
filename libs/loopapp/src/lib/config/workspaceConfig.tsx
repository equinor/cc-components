import {
  usePBIOptions,
  useCCApiAccessCheck,
  useContextId,
  useHttpClient,
  useWorkspaceBookmarks,
  useCloseSidesheetOnContextChange,
} from '@cc-components/shared';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import { Workspace } from '@equinor/workspace-fusion';
import { useGardenConfig } from './gardenConfig';
import { sidesheetConfig } from './loopSidesheet';
import { useStatusBarConfig } from './statusBarConfig';
import { useTableConfig } from './tableConfig';

import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { CCApiAccessLoading } from '@cc-components/sharedcomponents';

export const WorkspaceWrapper = () => {
  const contextId = useContextId();
  useCloseSidesheetOnContextChange();
  const pbi = usePBIOptions('loop-analytics', {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  });
  const client = useHttpClient();
  const { bookmarkKey, currentBookmark, onBookmarkChange } = useWorkspaceBookmarks();
  const { isLoading } = useCCApiAccessCheck(contextId, client, 'loop');

  const filterOptions = useFilterConfig((req) =>
    client.fetch(`/api/contexts/${contextId}/loop/filter-model`, req)
  );
  const tableConfig = useTableConfig(contextId);

  const statusBarConfig = useStatusBarConfig(contextId);
  const gardenConfig = useGardenConfig(contextId);

  if (isLoading) {
    return <CCApiAccessLoading />;
  }

  return (
    <Workspace
      key={bookmarkKey + contextId}
      currentBookmark={currentBookmark}
      onBookmarkChange={onBookmarkChange}
      workspaceOptions={{
        getIdentifier: (item) => item.checklistId,
        defaultTab: 'grid',
      }}
      filterOptions={filterOptions}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      statusBarOptions={statusBarConfig}
      powerBiOptions={pbi}
      sidesheetOptions={sidesheetConfig}
      modules={[gridModule, gardenModule, powerBiModule]}
    />
  );
};
