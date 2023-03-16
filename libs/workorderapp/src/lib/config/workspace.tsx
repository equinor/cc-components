import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import Workspace from '@equinor/workspace-fusion';
import { contextConfig } from './contextConfig';
import { filterConfig } from './filterConfig';
import { gardenConfig } from './gardenConfig';
import { sidesheetConfig } from './sidesheetConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';

type WorkspaceWrapperProps = {
  contextId: string;
};
export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const ccApp = useHttpClient('cc-app');
  const getResponseAsync = async (signal: AbortSignal | undefined) =>
    ccApp.fetch(`/api/work-orders?contextId=${contextId}`, {
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
        responseParser: async (res) => {
          const resJson = await res.json();
          return resJson.result;
        },
        queryKey: ['workorder', contextId],
      }}
      sidesheetOptions={sidesheetConfig}
      contextOptions={contextConfig}
      modules={[gridModule, gardenModule, powerBiModule]}
    />
  );
};
