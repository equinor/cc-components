import Workspace from '@equinor/workspace-fusion';
import { gardenConfig } from './gardenConfig';
import { tableConfig } from './tableConfig';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { contextConfig } from './contextConfig';
import { responseParser } from './responseConfig';
import { sidesheetConfig } from './sidesheetConfig';
import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';

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
        getIdentifier: (item) => item.commissioningPackageId,
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
      modules={[gridModule, gardenModule, powerBiModule]}
    />
  );
};
