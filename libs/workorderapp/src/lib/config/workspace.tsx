import {
  CCApiUnauthorizedError,
  useErrorBoundaryTrigger,
  usePBIOptions,
} from '@cc-components/shared';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import Workspace from '@equinor/workspace-fusion';

import { sidesheetConfig } from './sidesheetConfig';

import { useTableConfig } from './tableConfig';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useStatusBarConfig } from './statusBarConfig';
import { useGardenConfig } from './gardenConfig';

type WorkspaceWrapperProps = {
  contextId: string;
};
export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const pbi = usePBIOptions('workorder-analytics', {
    column: 'CVPID',
    table: 'Dim_ProjectMaster',
  });

  const client = useHttpClient('cc-app');

  const boundaryTrigger = useErrorBoundaryTrigger();

  const filterConfig = useFilterConfig((req) =>
    client.fetch(`/api/contexts/${contextId}/work-orders/filter-model`, req)
  );
  const tableConfig = useTableConfig(contextId, () =>
    boundaryTrigger(new CCApiUnauthorizedError(''))
  );
  const statusBarConfig = useStatusBarConfig(contextId);
  const gardenConfig = useGardenConfig(contextId, () =>
    boundaryTrigger(new CCApiUnauthorizedError(''))
  );

  return (
    <>
      <Workspace
        key={contextId}
        workspaceOptions={{
          appKey: 'Workorder',
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
