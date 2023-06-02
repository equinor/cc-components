import Workspace from '@equinor/workspace-fusion';
import { SoftwareChangeRecord } from '@cc-components/swcrshared';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import { useContextId, useHttpClient } from '@cc-components/shared';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { useTableConfig } from './tableConfig';

export const WorkspaceWrapper = () => {
  const contextId = useContextId();
  const client = useHttpClient();
  const pbi = usePBIOptions('swcr-analytics', {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  });

  const filterOptions = useFilterConfig((req) =>
    client.fetch(`/api/contexts/${contextId}/swcr/filter-model`, req)
  );

  const gridOptions = useTableConfig(contextId);

  return (
    <Workspace<SoftwareChangeRecord>
      key={contextId}
      workspaceOptions={{
        appKey: 'SWCR',
        getIdentifier: (item) => item.softwareChangeRecordNo,
        defaultTab: 'garden',
      }}
      filterOptions={filterOptions}
      // gardenOptions={gardenConfig}
      gridOptions={gridOptions}
      // statusBarOptions={statusBarConfig}
      // sidesheetOptions={sidesheetConfig}
      powerBiOptions={pbi}
      modules={[powerBiModule, gardenModule, gridModule]}
    />
  );
};
