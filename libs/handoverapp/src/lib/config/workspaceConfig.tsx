import {
  useCCApiAccessCheck,
  useCloseSidesheetOnContextChange,
  useContextId,
  usePBIOptions,
  useWorkspaceBookmarks,
} from '@cc-components/shared';
import { CCApiAccessLoading } from '@cc-components/sharedcomponents';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import Workspace from '@equinor/workspace-fusion';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { useGardenConfig } from './gardenConfig';
import { sidesheetConfig } from './sidesheetConfig';
import { useStatusBarConfig } from './statusBarConfig';
import { useTableConfig } from './tableConfig';

export const WorkspaceWrapper = () => {
  const contextId = useContextId();
  useCloseSidesheetOnContextChange();
  const client = useHttpClient('cc-app');
  const { isLoading } = useCCApiAccessCheck(contextId, client, 'handover');

  const pbi = usePBIOptions('handoveranalytics', {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  });

  const { bookmarkKey, currentBookmark, onBookmarkChange } = useWorkspaceBookmarks();

  const filterConfig = useFilterConfig((req) =>
    client.fetch(`/api/contexts/${contextId}/handover/filter-model`, req)
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
        getIdentifier: (item) => item.commissioningPackageUrlId,
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
