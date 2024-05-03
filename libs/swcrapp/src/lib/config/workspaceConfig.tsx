import {
  useCCApiAccessCheck,
  useCloseSidesheetOnContextChange,
  useContextId,
  useHttpClient,
  usePBIOptions,
  useWorkspaceBookmarks,
} from '@cc-components/shared';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import { CCApiAccessLoading } from '@cc-components/sharedcomponents';
import Workspace from '@equinor/workspace-fusion';

import { sidesheetConfig } from './sidesheetConfig';

import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';

import { useGardenConfig } from './gardenConfig';
import { useStatusBarConfig } from './statusBarConfig';
import { useTableConfig } from './tableConfig';

export const WorkspaceWrapper = () => {
  const contextId = useContextId();
  useCloseSidesheetOnContextChange();
  const ccApi = useHttpClient();

  const pbi = usePBIOptions('swcr-analytics', {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  });

  const { bookmarkKey, currentBookmark, onBookmarkChange } = useWorkspaceBookmarks();

  const filterConfig = useFilterConfig((req) =>
    ccApi.fetch(`/api/contexts/${contextId}/swcr/filter-model`, req)
  );
  const tableConfig = useTableConfig(contextId);
  const statusbarConfig = useStatusBarConfig(contextId);
  const gardenConfig = useGardenConfig(contextId);
  const { isLoading } = useCCApiAccessCheck(contextId, ccApi, 'swcr');

  if (isLoading) {
    return <CCApiAccessLoading />;
  }

  return (
    <Workspace
      key={contextId + bookmarkKey}
      currentBookmark={currentBookmark}
      onBookmarkChange={onBookmarkChange}
      workspaceOptions={{
        getIdentifier: (item) => item.softwareChangeRecordId,
        defaultTab: 'garden',
      }}
      filterOptions={filterConfig}
      gridOptions={tableConfig}
      gardenOptions={gardenConfig}
      statusBarOptions={statusbarConfig}
      sidesheetOptions={sidesheetConfig}
      powerBiOptions={pbi}
      modules={[gardenModule, gridModule, powerBiModule]}
    />
  );
};
