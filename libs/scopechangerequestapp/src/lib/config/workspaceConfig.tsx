import Workspace, { WorkspaceConfig } from '@equinor/workspace-fusion';
import { ScopeChangeRequest } from '@cc-components/scopechangerequestshared';
import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { useTableConfig } from './tableConfig';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import { useContextId, useHttpClient } from '@cc-components/shared';
import { sidesheetConfig } from './sidesheetConfig';

const options: WorkspaceConfig<ScopeChangeRequest> = {
  getIdentifier: (request) => request.id,
};

export const WorkspaceWrapper = () => {
  const contextId = useContextId();
  const client = useHttpClient();

  const pbi = usePBIOptions('pp-scope-change-analytics', {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  });
  const filterConfig = useFilterConfig((req) =>
    client.fetch(`/api/scope-change-requests/filter-model`, req)
  );
  const tableConfig = useTableConfig(contextId);
  return (
    <Workspace
      key={contextId}
      workspaceOptions={options}
      powerBiOptions={pbi}
      gridOptions={tableConfig}
      // gardenOptions={gardenConfig}
      filterOptions={filterConfig}
      modules={[gardenModule, gridModule, powerBiModule]}
      sidesheetOptions={sidesheetConfig}
    />
  );
};
