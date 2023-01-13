import Workspace from '@equinor/workspace-fusion';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';
import { gardenConfig } from './gardenConfig';
import { useCallback } from 'react';
import { contextConfig } from './contextConfig';
import { responseParser } from './responseConfig';
import { sidesheetConfig } from './sidesheetConfig';

type WorkspaceWrapperProps = {
  contextId: string;
};
export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const dataProxy = useHttpClient('data-proxy');
  const getResponseAsync = useCallback(
    async (signal: AbortSignal | undefined) => {
      const mcpkgs = await dataProxy.fetch(`/api/contexts/${contextId}/mc-pkgs`, {
        signal,
      });
      return mcpkgs;
    },
    [dataProxy, contextId]
  );

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
      fusionPowerBiOptions={{
        reportUri: 'pp-mc-analytics',
      }}
      dataOptions={{
        getResponseAsync,
        responseParser,
      }}
      sidesheetOptions={sidesheetConfig}
      contextOptions={contextConfig}
    />
  );
};
