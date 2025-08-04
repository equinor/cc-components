import {
  useCCApiAccessCheck,
  useContextId,
  useHttpClient,
  usePBIOptions,
  useWorkspaceBookmarks,
  useCloseSidesheetOnContextChange,
  isAffiliateUser,
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
import { CCApiAccessLoading } from '@cc-components/sharedcomponents';
import { useModuleCurrentContext } from '@equinor/fusion-framework-react-module-context';
const appName = 'work-orders';

const pbi_context_mapping = {
  Facility: {
    column: 'Facility',
    table: 'Dim_Facility',
  },
  ProjectMaster: {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  },
} as const;

export const WorkspaceWrapper = () => {
  const contextId = useContextId();
  useCloseSidesheetOnContextChange();
  const client = useHttpClient();
  const { bookmarkKey, currentBookmark, onBookmarkChange } = useWorkspaceBookmarks();
  const { isLoading } = useCCApiAccessCheck(contextId, client, appName);

  const { currentContext } = useModuleCurrentContext();

  const pbi = usePBIOptions(
    'workorder-analytics',
    pbi_context_mapping[currentContext?.type.id as 'ProjectMaster' | 'Facility']
  );

  const filterConfig = useFilterConfig((req) =>
    client.fetch(`/api/contexts/${contextId}/${appName}/filter-model`, req)
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
        appName={appName}
        key={contextId + bookmarkKey}
        currentBookmark={currentBookmark}
        onBookmarkChange={onBookmarkChange}
        workspaceOptions={{
          getIdentifier: (item: any) => item.workOrderId,
          defaultTab: 'grid',
          information: {
            title: 'Workorder Workspace',
            dataSource: 'ProCoSys / Alpha',
            dataRefreshRate: 'Hourly',
            access: 'Internal',
            isAffiliate: isAffiliateUser(),
          },
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
