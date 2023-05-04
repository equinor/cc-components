import {
  CCApiUnauthorizedError,
  useErrorBoundaryTrigger,
  usePBIOptions,
} from '@cc-components/shared';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import Workspace from '@equinor/workspace-fusion';

import { sidesheetConfig } from './sidesheetConfig';

import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useTableConfig } from './tableConfig';
import { useStatusBarConfig } from './statusBarConfig';
import { useGardenConfig } from './gardenConfig';

type WorkspaceWrapperProps = {
  contextId: string;
};
export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const ccApi = useHttpClient('cc-api');

  const pbi = usePBIOptions('cc-punch-analytics', {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  });

  const boundaryTrigger = useErrorBoundaryTrigger();

  const filterConfig = useFilterConfig((req) =>
    ccApi.fetch(`/api/contexts/${contextId}/punch/filter-model`, req)
  );
  const tableConfig = useTableConfig(contextId);
  const statusbarConfig = useStatusBarConfig(contextId);
  const gardenConfig = useGardenConfig(contextId, () =>
    boundaryTrigger(new CCApiUnauthorizedError(''))
  );

  return (
    <Workspace
      key={contextId}
      workspaceOptions={{
        appKey: 'Loop',
        getIdentifier: (item) => item.punchItemNo,
        defaultTab: 'grid',
      }}
      filterOptions={filterConfig}
      gridOptions={tableConfig}
      gardenOptions={gardenConfig}
      statusBarOptions={statusbarConfig}
      sidesheetOptions={sidesheetConfig}
      powerBiOptions={pbi}
      modules={[gardenModule, gridModule, powerBiModule]}
    />
  );
};
