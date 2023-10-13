import Workspace, { WorkspaceConfig } from '@equinor/workspace-fusion';
import { ScopeChangeRequest } from '../types/scopeChangeRequest';
import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { useTableConfig } from './tableConfig';

import { useContextId, useHttpClient } from '@cc-components/shared';

const options: WorkspaceConfig<ScopeChangeRequest> = {
  getIdentifier: (request) => request.id,
};

export const WorkspaceWrapper = () => {
  const scopechangeApi = useHttpClient();
  const contextId = useContextId();
  const pbi = usePBIOptions('pp-scope-change-analytics', {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  });
  const tableConfig = useTableConfig(contextId);
  return (
    <Workspace
      key={contextId}
      workspaceOptions={options}
      powerBiOptions={pbi}
      gridOptions={tableConfig}
      // gardenOptions={gardenConfig}
      // filterOptions={filterConfig}
      modules={[gardenModule, gridModule, powerBiModule]}
    />
  );
};
