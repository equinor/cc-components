import Workspace from '@equinor/workspace-fusion';
import { SoftwareChangeRecord } from '@cc-components/swcrshared';
import { useFilterConfig } from '@cc-components/shared/workspace-config';
import { usePBIOptions } from '@cc-components/shared/pbi-helpers';
import { useContextId, useHttpClient } from '@cc-components/shared';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { useTableConfig } from './tableConfig';
import { useGardenConfig } from './gardenConfig';
import { StatusBarConfig } from '@equinor/workspace-fusion/status-bar';

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

  const gardenConfig = useGardenConfig(contextId);
  const statusBarConfig = useStatusBarConfig(contextId);
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
      gardenOptions={gardenConfig}
      gridOptions={gridOptions}
      statusBarOptions={statusBarConfig}
      // sidesheetOptions={sidesheetConfig}
      powerBiOptions={pbi}
      modules={[powerBiModule, gardenModule, gridModule]}
    />
  );
};

export const useStatusBarConfig = (
  contextId: string
): StatusBarConfig<SoftwareChangeRecord[]> => {
  const client = useHttpClient();

  return async (filters, signal) => {
    const res = await client.fetch(`/api/contexts/${contextId}/swcr/kpis`, {
      method: 'POST',
      body: JSON.stringify({
        filter: filters,
      }),
      signal,
      headers: {
        ['content-type']: 'application/json',
      },
    });
    return (await res.json()).map((s: any) => ({ ...s, title: s.name }));
  };
};
