import Workspace from '@equinor/workspace-fusion';
import { gardenConfig } from './gardenConfig';
import { tableConfig } from './tableConfig';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { useCallback } from 'react';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { contextConfig } from './contextConfig';
import { responseParser } from './responseConfig';
import { sidesheetConfig } from './sidesheetConfig';

type WorkspaceWrapperProps = {
  contextId: string;
};
export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const dataProxy = useHttpClient('data-proxy');
  const getResponseAsync = useCallback(async () => {
    const commpkgs = await dataProxy.fetch(`/api/contexts/${contextId}/handover`);
    return commpkgs;
  }, [contextId, dataProxy]);

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
      fusionPowerBiOptions={{
        reportUri: 'pp-handover-analytics',
      }}
      dataOptions={{
        getResponseAsync,
        responseParser,
      }}
      contextOptions={contextConfig}
    />
  );
};
