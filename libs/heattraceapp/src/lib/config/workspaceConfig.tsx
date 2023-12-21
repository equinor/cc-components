import Workspace from '@equinor/workspace-fusion';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import { useTableConfig } from './tableConfig';
import { useStatusBarConfig } from './statusBarConfig';
import { useCCApiAccessCheck, useContextId, useHttpClient, usePBIOptions } from '@cc-components/shared';
import { CCApiAccessLoading } from '@cc-components/sharedcomponents';
import { useGardenConfig } from './gardenConfig';
import { sidesheetConfig } from './heattraceSidesheet';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';

export const WorkspaceWrapper = () => {
  const contextId = useContextId();
  const client = useHttpClient();
  const { isLoading } = useCCApiAccessCheck(contextId, client, 'heat-trace');

const pbi = usePBIOptions('cc-heattrace-analytics', {
  column: 'ProjectMaster GUID',
  table: 'Dim_ProjectMaster',
});


  const filterOptions = useFilterConfig((req) =>
    client.fetch(`/api/contexts/${contextId}/heat-trace/filter-model`, req)
  );

  const tableConfig = useTableConfig(contextId);
  const statusBarConfig = useStatusBarConfig(contextId);
  const gardenConfig = useGardenConfig(contextId);

  if (isLoading) {
    return <CCApiAccessLoading />;
  }

  return (
    <Workspace
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
