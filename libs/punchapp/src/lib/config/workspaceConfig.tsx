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

import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';

import { useTableConfig } from './tableConfig';
import { useStatusBarConfig } from './statusBarConfig';
import { useGardenConfig } from './gardenConfig';

export const WorkspaceWrapper = () => {
  const contextId = useContextId();
  const ccApi = useHttpClient();

  const pbi = usePBIOptions('cc-punch-analytics', {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  });

  const filterConfig = useFilterConfig((req) =>
    ccApi.fetch(`/api/contexts/${contextId}/punch/filter-model`, req)
  );
  const tableConfig = useTableConfig(contextId);
  const statusbarConfig = useStatusBarConfig(contextId);
  const gardenConfig = useGardenConfig(contextId);
  const { isLoading } = useCCApiAccessCheck(contextId, ccApi, 'punch');

  if (isLoading) {
    return <CCApiAccessLoading />;
  }

  return (
    <Workspace
      key={contextId}
      workspaceOptions={{
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
