import { useFramework } from '@equinor/fusion-framework-react';
import Workspace from '@equinor/workspace-fusion';
import { useModuleCurrentContext } from '@equinor/fusion-framework-react-module-context';

type WorkspaceWrapperProps = {
  contextId: string;
};
export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const serviceDiscovery = useFramework().modules.serviceDiscovery;
  const context = useModuleCurrentContext();
  return (
    <Workspace
      workspaceOptions={{
        appKey: 'Checklist',
        defaultTab: 'powerbi',
        getIdentifier: () => '',
      }}
      powerBiOptions={{
        reportUri: 'checklist-analytics',
        getEmbed: async (reportUri) => {
          const client = await serviceDiscovery.createClient('reports');
          const res = await client.fetch(
            `https://pro-s-reports-ci.azurewebsites.net/reports/${reportUri}/config/embedinfo`
          );
          const { embedConfig } = await res.json();
          return embedConfig;
        },
        getToken: async (reportUri) => {
          const client = await serviceDiscovery.createClient('reports');
          const res = await client.fetch(
            `https://pro-s-reports-ci.azurewebsites.net/reports/${reportUri}/token`
          );
          return res.json();
        },
        filters: {
          target: { column: 'ProjectName', table: 'Dim_ProjectMaster' },
          values: [context.currentContext?.title ?? ''],
        },
      }}
    />
  );
};
