import { HandoverPackage } from '@cc-components/handovershared';
import { sortPackagesByStatus } from '../utils-statuses/sortPackagesByStatus';
import Workspace from '@equinor/workspace-fusion';
import { gardenConfig } from './gardenConfig';
import { tableConfig } from './tableConfig';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { contextConfig } from './contextConfig';
import { sidesheetConfig } from './sidesheetConfig';
import {
  usePBIOptions,
  useErrorBoundaryTrigger,
  FusionDataProxyUnauthorized,
} from '@cc-components/shared';
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

  const trigger = useErrorBoundaryTrigger();

  const pbi = usePBIOptions('handoveranalytics', {
    column: 'CVPID',
    table: 'Dim_ProjectMaster',
  });

  const responseParser = async (response: Response) => {
    if (response.status === 403) {
      const error = await response.json();
      trigger(new FusionDataProxyUnauthorized(error));
      throw new Error('');
    }

    const parsedResponse = JSON.parse(await response.text()) as HandoverPackage[];
    return parsedResponse.sort(sortPackagesByStatus);
  };

  return (
    <Workspace
      key={contextId}
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
      modules={[gridModule, gardenModule, powerBiModule]}
    />
  );
};
