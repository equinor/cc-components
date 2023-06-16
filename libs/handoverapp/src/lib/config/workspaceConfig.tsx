import {
  CCApiAccessLoading,
  CCApiUnauthorizedError,
  useCCApiAccessCheck,
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
  const client = useHttpClient('cc-app');
  const { isLoading } = useCCApiAccessCheck(contextId, client, 'handover');

  const pbi = usePBIOptions('handoveranalytics', {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  });

  const boundaryTrigger = useErrorBoundaryTrigger();

  const filterConfig = useFilterConfig((req) =>
    client.fetch(`/api/contexts/${contextId}/handover/filter-model`, req)
  );
  const tableConfig = useTableConfig(contextId, () =>
    boundaryTrigger(new CCApiUnauthorizedError(''))
  );
  const statusBarConfig = useStatusBarConfig(contextId);

  const gardenConfig = useGardenConfig(contextId, () =>
    boundaryTrigger(new CCApiUnauthorizedError(''))
  );

  if (isLoading) {
    return <CCApiAccessLoading />;
  }

  return (
    <Workspace
      key={contextId}
      workspaceOptions={{
        appKey: 'Handover',
        getIdentifier: (item) => item.commissioningPackageUrlId,
        defaultTab: 'garden',
      }}
      powerBiOptions={pbi}
      filterOptions={filterConfig}
      gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      statusBarOptions={statusBarConfig}
      sidesheetOptions={sidesheetConfig}
      modules={[gridModule, gardenModule, powerBiModule]}
    />
  );
};
