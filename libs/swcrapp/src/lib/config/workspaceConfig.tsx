import Workspace from '@equinor/workspace-fusion';
import { gardenConfig } from './gardenConfig';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

import { sidesheetConfig } from './sidesheetConfig';
import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import {
  FusionDataProxyUnauthorized,
  useErrorBoundaryTrigger,
} from '@cc-components/shared';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { SwcrPackage } from '@cc-components/swcrshared';
import { sortPackagesByStatusAndNumber } from '../utils-statuses';

type WorkspaceWrapperProps = {
  contextId: string;
};
export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const dataProxy = useHttpClient('data-proxy');

  const getResponseAsync = async () => {
    const swcrs = await dataProxy.fetch(`/api/contexts/${contextId}/swcr`);
    return swcrs;
  };

  const pbi = usePBIOptions('swcr-analytics', {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  });

  const trigger = useErrorBoundaryTrigger();

  const responseParser = async (response: Response) => {
    if (response.status === 403) {
      trigger(new FusionDataProxyUnauthorized(await response.json()));
      throw new Error('');
    }
    const parsedResponse = JSON.parse(await response.text()) as SwcrPackage[];
    return parsedResponse.sort(sortPackagesByStatusAndNumber);
  };

  return (
    <Workspace
      key={contextId}
      workspaceOptions={{
        appKey: 'SWCR',
        getIdentifier: (item) => item.swcrId,
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
        queryKey: ['swcr', contextId],
      }}
      modules={[powerBiModule, gardenModule, gridModule]}
    />
  );
};
