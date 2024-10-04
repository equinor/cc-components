import Workspace from '@equinor/workspace-fusion';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { useTableConfig } from './tableConfig';
import { useStatusBarConfig } from './statusBarConfig';
import {
  useCCApiAccessCheck,
  useCloseSidesheetOnContextChange,
  useContextId,
  useHttpClient,
  usePBIOptions,
  useWorkspaceBookmarks,
} from '@cc-components/shared';
import { CCApiAccessLoading } from '@cc-components/sharedcomponents';
import { useGardenConfig } from './gardenConfig';
import { sidesheetConfig } from './heattraceSidesheet';
import { useModuleCurrentContext } from '@equinor/fusion-framework-react-module-context';

const pbi_context_mapping = {
  Facility: {
    column: 'Facility',
    table: 'Dim_Facility',
  },
  ProjectMaster: {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  },
} as const;

export const WorkspaceWrapper = () => {
  const contextId = useContextId();
  useCloseSidesheetOnContextChange();
  const client = useHttpClient();
  const { isLoading } = useCCApiAccessCheck(contextId, client, 'heat-trace');

  const filterOptions = useFilterConfig((req) =>
    client.fetch(`/api/contexts/${contextId}/heat-trace/filter-model`, req)
  );

  const { currentContext } = useModuleCurrentContext();

  const { bookmarkKey, currentBookmark, onBookmarkChange } = useWorkspaceBookmarks();

  const tableConfig = useTableConfig(contextId);
  const statusBarConfig = useStatusBarConfig(contextId);
  const gardenConfig = useGardenConfig(contextId);

  const pbi = usePBIOptions(
    'cc-heattrace-analytics',
    pbi_context_mapping[currentContext?.type.id as 'ProjectMaster' | 'Facility']
  );

  if (isLoading) {
    return <CCApiAccessLoading />;
  }

  return (
    <Workspace
      key={contextId + bookmarkKey}
      currentBookmark={currentBookmark}
      onBookmarkChange={onBookmarkChange}
      workspaceOptions={{
        getIdentifier: (ht) => ht.heatTraceCableId,
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
