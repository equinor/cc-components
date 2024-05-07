import {
  useCCApiAccessCheck,
  useCloseSidesheetOnContextChange,
  useContextId,
  useWorkspaceBookmarks,
} from '@cc-components/shared';
import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import { CCApiAccessLoading } from '@cc-components/sharedcomponents';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import Workspace from '@equinor/workspace-fusion';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import { useGardenConfig } from './gardenConfig';
import { sidesheetConfig } from './sidesheetConfig';
import { useStatusBarConfig } from './statusBarConfig';
import { useTableConfig } from './tableConfig';

export const WorkspaceWrapper = () => {
  const contextId = useContextId();
  useCloseSidesheetOnContextChange();
  const client = useHttpClient('cc-app');
  const { isLoading } = useCCApiAccessCheck(contextId, client, 'mechanical-completion');

  const pbi = usePBIOptions('mc-analytics', {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  });

  const { bookmarkKey, currentBookmark, onBookmarkChange } = useWorkspaceBookmarks();

  const filterConfig = useFilterConfig((req) =>
    client.fetch(`/api/contexts/${contextId}/mechanical-completion/filter-model`, req)
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
      workspaceOptions={{
        getIdentifier: (item) => item.mechanicalCompletionPackageUrlId,
        defaultTab: 'garden',
      }}
      currentBookmark={currentBookmark}
      onBookmarkChange={onBookmarkChange}
      powerBiOptions={pbi}
      filterOptions={filterConfig}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      statusBarOptions={statusBarConfig}
      sidesheetOptions={sidesheetConfig}
      modules={[gridModule, gardenModule, powerBiModule]}
    />
  );
};
