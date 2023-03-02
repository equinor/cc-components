import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import { Workspace } from '@equinor/workspace-fusion';
import { contextConfig } from './contextConfig';
import { filterConfig } from './filterConfig';
import { gardenConfig } from './gardenConfig';
import { sidesheetConfig } from './loopSidesheet';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';
import { testData } from './testData';
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

  return (
    <Workspace
      dataOptions={{ initialData: testData }}
      workspaceOptions={{
        appKey: 'Loop',
        getIdentifier: (item) => item.checklistId,
        defaultTab: 'grid',
      }}
      filterOptions={filterConfig}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig()}
      statusBarOptions={statusBarConfig}
      powerBiOptions={pbi}
      contextOptions={contextConfig}
      sidesheetOptions={sidesheetConfig}
      modules={[gridModule, gardenModule, powerBiModule]}
    />
  );
};
