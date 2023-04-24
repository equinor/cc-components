import Workspace from '@equinor/workspace-fusion';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';
import { gardenConfig } from './gardenConfig';
import { contextConfig } from './contextConfig';
import { sidesheetConfig } from './sidesheetConfig';
import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import { FusionDataProxyError, UnathorizedPage } from '@cc-components/shared';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { McPackage } from '@cc-components/mechanicalcompletionshared';
import { sortPackagesByStatus } from '../utils-statuses/sortPackagesByStatus';
import { useState } from 'react';

type WorkspaceWrapperProps = {
  contextId: string;
};

export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const [unauthorized, setUnauthorized] = useState<FusionDataProxyError | false>(false);
  const dataProxy = useHttpClient('data-proxy');
  const getResponseAsync = async (signal: AbortSignal | undefined) =>
    dataProxy.fetch(`/api/contexts/${contextId}/mc-pkgs`, {
      signal,
    });

  const pbi = usePBIOptions('mc-analytics', {
    column: 'ProjectName',
    table: 'Dim_ProjectMaster',
  });

  const responseParser = async (response: Response) => {
    if (response.status === 403) {
      setUnauthorized(await response.json());
      throw new Error('');
    }

    const parsedResponse = JSON.parse(await response.text()) as McPackage[];
    return parsedResponse.sort(sortPackagesByStatus);
  };

  if (unauthorized) {
    return <UnathorizedPage error={unauthorized} />;
  }

  return (
    <Workspace
      key={contextId}
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
      modules={[gridModule, gardenModule, powerBiModule]}
    />
  );
};
