import { HandoverPackage } from '@cc-components/handovershared';
import { sortPackagesByStatus } from '../utils-statuses/sortPackagesByStatus';
import Workspace from '@equinor/workspace-fusion';
import { gardenConfig } from './gardenConfig';
import { tableConfig } from './tableConfig';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { contextConfig } from './contextConfig';
import { sidesheetConfig } from './sidesheetConfig';
import {
  usePBIOptions,
  useErrorBoundaryTrigger,
  FusionDataProxyUnauthorized,
  useContextId,
  useHttpClient,
} from '@cc-components/shared';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';

export const WorkspaceWrapper = () => {
  const id = useContextId();

  const dataProxy = useHttpClient();
  const getResponseAsync = async (signal: AbortSignal | undefined) =>
    dataProxy.fetch(`/api/contexts/${id}/handover`, {
      signal,
    });

  const trigger = useErrorBoundaryTrigger();

  const pbi = usePBIOptions('handoveranalytics', {
    column: 'ProjectMaster GUID',
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
      key={id}
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
        queryKey: ['handover', id],
      }}
      contextOptions={contextConfig}
      modules={[gridModule, gardenModule, powerBiModule]}
    />
  );
};
