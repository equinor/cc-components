import {
  CCApiAccessLoading,
  useCCApiAccessCheck,
  useContextId,
  useHttpClient,
  usePBIOptions,
} from '@cc-components/shared';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import Workspace from '@equinor/workspace-fusion';

import { sidesheetConfig } from './sidesheetConfig';

import { useTableConfig } from './tableConfig';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { useStatusBarConfig } from './statusBarConfig';
import { useGardenConfig } from './gardenConfig';

export const WorkspaceWrapper = () => {
  const contextId = useContextId();

  const client = useHttpClient();
  const { isLoading } = useCCApiAccessCheck(contextId, client, 'work-orders');
  const pbi = usePBIOptions('workorder-analytics', {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  });

  const filterConfig = useFilterConfig((req) =>
    client.fetch(`/api/contexts/${contextId}/work-orders/filter-model`, req)
  );
  const tableConfig = useTableConfig(contextId);
  const statusBarConfig = useStatusBarConfig(contextId);
  const gardenConfig = useGardenConfig(contextId);

  if (isLoading) {
    return <CCApiAccessLoading />;
  }

  return (
    <>
      <Workspace
        key={contextId}
        workspaceOptions={{
          getIdentifier: (item) => item.workOrderId,
          defaultTab: 'grid',
        }}
        powerBiOptions={pbi}
        filterOptions={filterConfig}
        gardenOptions={gardenConfig}
        gridOptions={tableConfig}
        statusBarOptions={statusBarConfig}
        sidesheetOptions={sidesheetConfig}
        modules={[gridModule, gardenModule, powerBiModule]}
      />
    </>
  );
};
