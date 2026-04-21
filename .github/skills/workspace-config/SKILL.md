---
name: workspace-config
description: "Create or edit workspace configuration for CC apps (workspace.tsx, frameworkConfig.ts). USE FOR: wiring Fusion workspace modules (grid, garden, Power BI, sidesheet, filter, status bar), configuring httpClient, enabling context/bookmarks/AG Grid, useContextId, useCCApiAccessCheck, useHttpClient, useFilterConfig, WorkspaceWrapper component. DO NOT USE FOR: column definitions (use table-config skill), sidesheet UI (use sidesheet skill)."
---

# Workspace Configuration

Every CC app follows the same workspace wiring pattern. This skill covers `workspace.tsx` and `frameworkConfig.ts`.

## Workspace Component Pattern (`workspace.tsx`)

Every `WorkspaceWrapper` follows this structure:

```tsx
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
import { CCApiAccessLoading } from '@cc-components/sharedcomponents';
import { useModuleCurrentContext } from '@equinor/fusion-framework-react-module-context';

// Module imports
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { gardenModule } from '@equinor/workspace-fusion/garden-module';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';

// Local config imports
import { sidesheetConfig } from './sidesheetConfig';
import { useTableConfig } from './tableConfig';
import { useStatusBarConfig } from './statusBarConfig';
import { useGardenConfig } from './gardenConfig';

const appName = '<api-name>'; // e.g. 'work-orders', 'swcr'

const pbi_context_mapping = {
  Facility: { column: 'Facility', table: 'Dim_Facility' },
  ProjectMaster: { column: 'ProjectMaster GUID', table: 'Dim_ProjectMaster' },
} as const;

export const WorkspaceWrapper = () => {
  const contextId = useContextId();
  useCloseSidesheetOnContextChange();
  const client = useHttpClient();
  const { bookmarkKey, currentBookmark, onBookmarkChange } = useWorkspaceBookmarks();
  const { isLoading } = useCCApiAccessCheck(contextId, client, appName);
  const { currentContext } = useModuleCurrentContext();

  const pbi = usePBIOptions(
    '<app>-analytics',
    pbi_context_mapping[currentContext?.type.id as 'ProjectMaster' | 'Facility']
  );

  const filterConfig = useFilterConfig((req) =>
    client.fetch(`/api/contexts/${contextId}/${appName}/filter-model`, req)
  );
  const tableConfig = useTableConfig(contextId);
  const statusBarConfig = useStatusBarConfig(contextId);
  const gardenConfig = useGardenConfig(contextId);

  if (isLoading) return <CCApiAccessLoading />;

  return (
    <Workspace
      appName={appName}
      key={contextId + bookmarkKey}
      currentBookmark={currentBookmark}
      onBookmarkChange={onBookmarkChange}
      workspaceOptions={{
        getIdentifier: (item: any) => item.<entityId>,
        defaultTab: 'grid',
        information: {
          title: '<AppName> Workspace',
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
  );
};
```

### Key conventions

- `appName` must match the CC API route segment (e.g. `'work-orders'`, not `'workorder'`)
- All config hooks receive `contextId` as parameter
- `useFilterConfig` takes a fetch callback, not a URL
- Modules are passed as array: `[gridModule, gardenModule, powerBiModule]`
- Always include `isAffiliate: isAffiliateUser()` in workspace information

## Framework Config Pattern (`frameworkConfig.ts`)

```tsx
import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { ComponentRenderArgs, IAppConfigurator } from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
import { enableBookmark } from '@equinor/fusion-framework-react-app/bookmark';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';
import { enableModelViewer, ModelViewerEnvConfig } from '@cc-components/modelviewer';
import { defaultModules } from '@cc-components/shared';
import { themeQuartz } from '@equinor/workspace-fusion/grid';
import buildQuery from 'odata-query';

export const configure = async (config: IAppConfigurator, c: ComponentRenderArgs) => {
  enableNavigation(config, c.env.basename);
  enableBookmark(config);
  enableContext(config, async (builder) => {
    builder.setContextType(['ProjectMaster', 'Facility']);
    builder.setContextParameterFn(({ search, type }) =>
      buildQuery({ search, filter: { type: { in: type } } })
    );
  });

  const envConfig = c.env.config?.environment as AppEnvConfig & ModelViewerEnvConfig;
  if (!envConfig) throw new Error('Failed to load environment config');

  config.configureHttpClient('cc-app', {
    baseUri: envConfig.uri,
    defaultScopes: envConfig.defaultScopes,
  });

  enableAgGrid(config, (b) => {
    b.setModules(defaultModules);
    b.setTheme(themeQuartz.withParams({}));
  });

  enableModelViewer(config, envConfig);
};
```

### Key conventions

- HTTP client key is always `'cc-app'`
- Context types are `['ProjectMaster', 'Facility']`
- AG Grid uses `defaultModules` from `@cc-components/shared` and `themeQuartz`
- Model viewer is enabled from `@cc-components/modelviewer`

## Config Index (`index.ts`)

```ts
export { useTableConfig } from './tableConfig';
export { WorkspaceWrapper } from './workspace';
export { configure } from './frameworkConfig';
```

## Checklist

- [ ] `appName` matches CC API route segment
- [ ] `getIdentifier` returns correct entity ID field
- [ ] All 5 config hooks wired: filter, table, garden, status bar, sidesheet
- [ ] Power BI report name matches backend configuration
- [ ] Framework config enables: navigation, bookmark, context, AG Grid, model viewer
- [ ] HTTP client configured as `'cc-app'`
