import Workspace from '@equinor/workspace-fusion';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { useContextId, useHttpClient } from '@cc-components/shared';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import { useTableConfig } from './tableConfig';
import { ElectricalSidesheet } from './ElectricalSidesheet';

export type ElectricalConsumer = {
  consumerType: string;
  instCode: string;
  tagNo: string;
  cubicleId: string | null;
  drawerId: string | null;
  branchId: number;
  description: string;
  tagCategory: number;
  tagCategoryDescription: string;
  tagStatus: string;
  componentType: any;
  eleSymbolCode: any;
  mechanicalCompletionPackageNo: string | null;
  commissioningPackageNo: string | null;
  projectCode: string;
};

export const WorkspaceWrapper = () => {
  const contextId = useContextId();

  const client = useHttpClient();
  const gridConfig = useTableConfig(contextId);

  const filterConfig = useFilterConfig((req) =>
    client.fetch(`/api/contexts/${contextId}/electrical/consumers/filter-model`, req)
  );

  return (
    <Workspace<ElectricalConsumer>
      key={contextId}
      workspaceOptions={{
        getIdentifier: (e) =>
          encodeURIComponent(`${e.tagNo}_${e.instCode}_${e.projectCode}`),
      }}
      filterOptions={filterConfig}
      sidesheetOptions={{
        type: 'default',
        DetailsSidesheet: ElectricalSidesheet,
      }}
      gridOptions={gridConfig}
      modules={[gridModule, gardenModule, powerBiModule]}
    />
  );
};
