import Workspace from '@equinor/workspace-fusion';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';
import { gardenConfig } from './gardenConfig';
import { contextConfig } from './contextConfig';
import { responseParser } from './responseConfig';
import { sidesheetConfig } from './sidesheetConfig';
import { usePBIOptions } from '@cc-components/shared/hooks';

type WorkspaceWrapperProps = {
  contextId: string;
};
export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const dataProxy = useHttpClient('data-proxy');
  const getResponseAsync = async (signal: AbortSignal | undefined) =>
    dataProxy.fetch(`/api/contexts/${contextId}/mc-pkgs`, {
      signal,
    });

  const pbi = usePBIOptions('mc-analytics', {
    column: 'ProjectName',
    table: 'Dim_ProjectMaster',
  });

  return (
    <Workspace
      workspaceOptions={{
        appKey: 'MC',
        getIdentifier: (item) => item.mcPkgId,
        defaultTab: 'garden',
      }}
      filterOptions={filterConfig}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      statusBarOptions={statusBarConfig}
      powerBiOptions={pbi}
      dataOptions={{
        getResponseAsync,
        responseParser,
        queryKey: ['mechanical_completion', contextId],
      }}
      sidesheetOptions={sidesheetConfig}
      contextOptions={contextConfig}
    />
  );
};
