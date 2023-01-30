import { usePBIOptions } from '@cc-components/shared';
import Workspace from '@equinor/workspace-fusion';
import { filterConfig } from './filterConfig';
import { gardenConfig } from './gardenConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';
import { testData } from './testData';
type WorkspaceWrapperProps = {
  contextId: string;
};
export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  const pbi = usePBIOptions('punch-analytics', {
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
      powerBiOptions={pbi}
    />
  );
};
