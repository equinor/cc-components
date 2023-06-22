import Workspace, { WorkspaceConfig } from '@equinor/workspace-fusion';
import { ScopeChangeRequest } from '../types/scopeChangeRequest';
import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { tableConfig } from './tableConfig';
import { gardenConfig } from './gardenConfig';
import { filterConfig } from './filterConfig';
import { useContextId, useHttpClient } from '@cc-components/shared';

const options: WorkspaceConfig<ScopeChangeRequest> = {
  appKey: 'scopechangerequestapp',
  getIdentifier: (request) => request.id,
};

export const WorkspaceWrapper = () => {
  const scopechangeApi = useHttpClient();
  const contextId = useContextId();
  const pbi = usePBIOptions('pp-scope-change-analytics', {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  });

  const getResponseAsync = async () => {
    const res = await scopechangeApi.fetch(`/api/scope-change-requests`);
    if (!res.ok) throw new Error('');
    return res;
  };

  const responseParser = async (res: Response) => {
    const resJson = await res.json();
    return resJson;
  };

  return (
    <Workspace
      key={contextId}
      workspaceOptions={options}
      dataOptions={{
        getResponseAsync,
        responseParser,
        queryKey: ['SCOPECHANGEREQUEST', contextId],
      }}
      powerBiOptions={pbi}
      gridOptions={tableConfig}
      gardenOptions={gardenConfig}
      filterOptions={filterConfig}
      modules={[gardenModule, gridModule, powerBiModule]}
    />
  );
};
