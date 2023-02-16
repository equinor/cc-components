import Workspace from '@equinor/workspace-fusion';
import { gardenConfig } from './gardenConfig';
import { tableConfig } from './tableConfig';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { contextConfig } from './contextConfig';
import { responseParser } from './responseConfig';
import { sidesheetConfig } from './sidesheetConfig';
import { usePBIOptions } from '@cc-components/shared';

type WorkspaceWrapperProps = {
  contextId: string;
};
export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const dataProxy = useHttpClient('data-proxy');
  const getResponseAsync = async (signal: AbortSignal | undefined) =>
    dataProxy.fetch(`/api/contexts/${contextId}/handover`, {
      signal,
    });

  const pbi = usePBIOptions('handoveranalytics', {
    column: 'ProjectName',
    table: 'Dim_ProjectMaster',
  });
  return (
    <Workspace
      workspaceOptions={{
        appKey: 'Handover',
        getIdentifier: (item) => item.id,
        defaultTab: 'garden',
      }}
      filterOptions={filterConfig}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      statusBarOptions={statusBarConfig}
      sidesheetOptions={sidesheetConfig}
      powerBiOptions={pbi}
      dataOptions={{
        getResponseAsync,
        responseParser,
        queryKey: ['handover', contextId],
      }}
      contextOptions={contextConfig}
    />
  );
};
