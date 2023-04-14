import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import { Workspace } from '@equinor/workspace-fusion';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useGardenConfig } from './gardenConfig';
import { sidesheetConfig } from './loopSidesheet';
import { useStatusBarConfig } from './statusBarConfig';
import { useTableConfig } from './tableConfig';

import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';

type WorkspaceWrapperProps = {
  contextId: string;
};

export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const pbi = usePBIOptions('loop-analytics', {
    column: 'ProjectName',
    table: 'Dim_ProjectMaster',
  });
  const client = useHttpClient('cc-api');
  const filterOptions = useFilterConfig((req) =>
    client.fetch(`/api/contexts/${contextId}/loop/filter-model`, req)
  );
  const tableConfig = useTableConfig(contextId);
  const statusBarConfig = useStatusBarConfig(contextId);
  const gardenConfig = useGardenConfig(contextId);
  return (
    <Workspace
      workspaceOptions={{
        appKey: 'Loop',
        getIdentifier: (item) => item.checklistId,
        defaultTab: 'grid',
      }}
      filterOptions={filterOptions}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      statusBarOptions={statusBarConfig}
      powerBiOptions={pbi}
      sidesheetOptions={sidesheetConfig}
      modules={[gridModule, gardenModule, powerBiModule]}
    />
  );
};
