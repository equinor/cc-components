import { usePBIOptions } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import Workspace from '@equinor/workspace-fusion';
import { contextConfig } from './contextConfig';
import { filterConfig } from './filterConfig';
import { gardenConfig } from './gardenConfig';
import { sidesheetConfig } from './sidesheetConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';
type WorkspaceWrapperProps = {
  contextId: string;
};
export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const dataProxy = useHttpClient('data-proxy');
  const getResponseAsync = async (signal: AbortSignal | undefined) =>
    dataProxy.fetch(`/api/contexts/${contextId}/work-orders`, {
      signal,
    });
  const pbi = usePBIOptions('workorder-analytics', {
    column: 'ProjectName',
    table: 'Dim_ProjectMaster',
  });
  return (
    <Workspace
      workspaceOptions={{
        appKey: 'Workorder',
        getIdentifier: (item) => item.workOrderId,
        defaultTab: 'garden',
      }}
      powerBiOptions={pbi}
      filterOptions={filterConfig}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      statusBarOptions={statusBarConfig}
      dataOptions={{
        getResponseAsync,
        queryKey: ['workorder', contextId],
      }}
      sidesheetOptions={sidesheetConfig}
      contextOptions={contextConfig}
    />
  );
};
