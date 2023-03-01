import { usePBIOptions } from '@cc-components/shared';
import Workspace from '@equinor/workspace-fusion';
import { filterConfig } from './filterConfig';
import { gardenConfig } from './gardenConfig';
import { sidesheetConfig } from './sidesheetConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';
import { testData } from './testData';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';

type WorkspaceWrapperProps = {
  contextId: string;
};
export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const pbi = usePBIOptions('cc-punch-analytics', {
    column: 'ProjectName',
    table: 'Dim_ProjectMaster',
  });

  return (
    <Workspace
      dataOptions={{ initialData: testData }}
      workspaceOptions={{
        appKey: 'Loop',
        getIdentifier: (item) => item.punchItemNo,
        defaultTab: 'grid',
      }}
      filterOptions={filterConfig}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      statusBarOptions={statusBarConfig}
      sidesheetOptions={sidesheetConfig}
      powerBiOptions={pbi}
      modules={[gardenModule, gridModule, powerBiModule]}
    />
  );
};
