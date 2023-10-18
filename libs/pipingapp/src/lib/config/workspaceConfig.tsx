import Workspace from '@equinor/workspace-fusion';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import { useTableConfig } from './tableConfig';
import { useStatusBarConfig } from './statusBarConfig';
import { useContextId } from '@cc-components/shared';
import { useGardenConfig } from './gardenConfig';
import { sidesheetConfig } from './pipingSidesheet';

export const WorkspaceWrapper = () => {
  const contextId = useContextId();
  // const client = useHttpClient('cc-api');
  // const { isLoading } = useCCApiAccessCheck(contextId, client, 'pipetest');

  // const filterOptions = useFilterConfig((req) =>
  //   client.fetch(`/api/contexts/${contextId}/pipetest/filter-model`, req)
  // );

  const tableConfig = useTableConfig(contextId);
  const statusBarConfig = useStatusBarConfig(contextId);
  const gardenConfig = useGardenConfig(contextId);

  // if (isLoading) {
  //   return <CCApiAccessLoading />;
  // }

  return (
    <Workspace
      workspaceOptions={{
        getIdentifier: () => '',
        defaultTab: 'grid',
      }}
      // filterOptions={filterOptions}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      statusBarOptions={statusBarConfig}
      sidesheetOptions={sidesheetConfig}
      modules={[gridModule, gardenModule]}
    />
  );
};
