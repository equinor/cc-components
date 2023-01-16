import Workspace from '@equinor/workspace-fusion';
import { gardenConfig } from './gardenConfig';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';
import { useCallback } from 'react';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { responseParser } from './responseConfig';
import { sidesheetConfig } from './sidesheetConfig';

type WorkspaceWrapperProps = {
  contextId: string;
};
export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const dataProxy = useHttpClient('data-proxy');

  const getResponseAsync = useCallback(async () => {
    const swcrs = await dataProxy.fetch(`/api/contexts/${contextId}/swcr`);
    return swcrs;
  }, [dataProxy, contextId]);

  return (
    <Workspace
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
      fusionPowerBiOptions={{
        reportUri: 'pp-swcr-analytics',
      }}
      dataOptions={{
        getResponseAsync,
        responseParser,
      }}
    />
  );
};
