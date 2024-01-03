import Workspace from '@equinor/workspace-fusion';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import { useTableConfig } from './tableConfig';
import { useStatusBarConfig } from './statusBarConfig';
import {
  useContextId,
  useHttpClient,
  useCCApiAccessCheck,
  useWorkspaceBookmarks,
} from '@cc-components/shared';
import { useGardenConfig } from './gardenConfig';
import { sidesheetConfig } from './pipingSidesheet';
import { CCApiAccessLoading } from '@cc-components/sharedcomponents';

export const WorkspaceWrapper = () => {
  const contextId = useContextId();
  const client = useHttpClient();
  const { isLoading } = useCCApiAccessCheck(contextId, client, 'pipetest');
  const { bookmarkKey, currentBookmark, onBookmarkChange } = useWorkspaceBookmarks();

  const filterOptions = useFilterConfig((req) =>
    client.fetch(`/api/contexts/${contextId}/pipetest/filter-model`, req)
  );

  const tableConfig = useTableConfig(contextId);
  const statusBarConfig = useStatusBarConfig(contextId);
  const gardenConfig = useGardenConfig(contextId);

  if (isLoading) {
    return <CCApiAccessLoading />;
  }
  return (
    <Workspace
      key={contextId + bookmarkKey}
      currentBookmark={currentBookmark}
      onBookmarkChange={onBookmarkChange}
      workspaceOptions={{
        getIdentifier: (pt) => pt.id,
        defaultTab: 'grid',
      }}
      filterOptions={filterOptions}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      statusBarOptions={statusBarConfig}
      sidesheetOptions={sidesheetConfig}
      modules={[gridModule, gardenModule]}
    />
  );
};
