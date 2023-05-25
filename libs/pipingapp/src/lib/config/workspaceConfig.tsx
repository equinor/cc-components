import Workspace from '@equinor/workspace-fusion';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import { useTableConfig } from './tableConfig';

type WorkspaceWrapperProps = {
  contextId: string;
};

export const WorkspaceWrapper = ({ contextId }: WorkspaceWrapperProps) => {
  // const client = useHttpClient('cc-api');
  // const { isLoading } = useCCApiAccessCheck(contextId, client, 'piping');

  // const filterOptions = useFilterConfig((req) =>
  //   client.fetch(`/api/contexts/${contextId}/piping/filter-model`, req)
  // );

  const tableConfig = useTableConfig(contextId);
  // const statusBarConfig = useStatusBarConfig(contextId);
  // const gardenConfig = useGardenConfig(contextId);

  // if (isLoading) {
  //   return <CCApiAccessLoading />;
  // }

  return (
    <Workspace
      workspaceOptions={{
        appKey: 'pipingapp',
        getIdentifier: () => '',
        defaultTab: 'grid',
      }}
      // filterOptions={filterOptions}
      // gardenOptions={gardenConfig}
      gridOptions={tableConfig}
      // statusBarOptions={statusBarConfig}
      modules={[gridModule]}
    />
  );
};
