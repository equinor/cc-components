import Workspace, { WorkspaceConfig } from '@equinor/workspace-fusion';
import { ScopeChangeRequest } from '../types/scopeChangeRequest';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { tableConfig } from './tableConfig';

const options: WorkspaceConfig<ScopeChangeRequest> = {
  appKey: 'scopechangerequestapp',
  getIdentifier: (request) => request.id,
};

type WorkspaceWrapperProps = {
  contextId: string;
};

export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const scopechangeApi = useHttpClient('scopechange');

  const pbi = usePBIOptions('pp-scope-change-analytics', {
    column: 'ProjectName',
    table: 'Dim_ProjectMaster',
  });

  const getResponseAsync = async () => {
    const res = await scopechangeApi.fetch(`/api/scope-change-requests`);
    return res;
  };

  const responseParser = async (res: Response) => {
    const resJson = await res.json();
    return resJson;
  };

  return (
    <Workspace
      workspaceOptions={options}
      dataOptions={{
        getResponseAsync,
        responseParser,
        queryKey: ['SCOPECHANGEREQUEST', contextId],
      }}
      powerBiOptions={pbi}
      gridOptions={tableConfig}
      modules={[gardenModule, gridModule, powerBiModule]}
    />
  );
};
