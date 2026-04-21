---
name: sidesheet
description: "Build sidesheet tabs and detail panels for CC apps. USE FOR: creating sidesheet components, detail tabs, data fetching hooks (useQuery), sidesheet types, sidesheetConfig wiring, StyledSideSheetContainer, SidesheetHeader, CustomStyledTabs, tab navigation, MccrTab, MaterialTab, NotificationTab, ModelViewerTab. DO NOT USE FOR: workspace configuration (use workspace-config skill), column definitions (use table-config skill)."
---

# Sidesheet

Each CC app has a sidesheet lib at `libs/<appname>sidesheet/` that provides the detail panel shown when a user clicks an item in the grid or garden.

## File Structure

```
libs/<appname>sidesheet/src/lib/
├── index.ts                           # Re-exports
├── types/
│   ├── index.ts
│   ├── <entity>Mccr.ts               # Checklist type
│   ├── <entity>Material.ts           # Material type
│   └── <entity>Notification.ts       # Notification type
├── ui-sidesheet/
│   ├── index.ts
│   ├── <Entity>Sidesheet.tsx          # Main sidesheet with tabs
│   └── DetailsTab.tsx                 # Details tab content
└── utils-sidesheet/
    ├── index.ts
    ├── useMccr.ts                     # Fetch checklists
    ├── useMaterial.ts                 # Fetch materials
    └── useNotifications.ts            # Fetch notifications
```

## Sidesheet Component Pattern

```tsx
import { Tabs } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  LinkCell, MaterialTab, MccrTab, NotificationTab,
  useContextId, useHttpClient,
} from '@cc-components/shared';
import {
  BannerItem, CustomStyledPanels, CustomStyledTabs,
  SidesheetHeader, SidesheetSkeleton, StyledBanner,
  StyledPanel, StyledSideSheetContainer, StyledTabListWrapper,
  StyledTabsList, TabTitle,
} from '@cc-components/sharedcomponents';
import { <Entity> } from '@cc-components/<appname>shared';
import { useMccr, useMaterial } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTab';

export const <Entity>Sidesheet = (props: {
  id: string;
  item?: <Entity>;
  close: VoidFunction;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const client = useHttpClient();
  const contextId = useContextId();

  // Fetch detail data
  const { data, error, isLoading } = useQuery<Entity>({
    queryKey: ['<entity>', props.id],
    queryFn: async ({ signal }) => {
      const res = await client.fetch(
        `/api/contexts/${contextId}/<api-route>/${props.id}`,
        { signal }
      );
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });

  // Fetch sub-tabs
  const { mccr, isFetching: isFetchingMccr } = useMccr(props.id);
  const { material, isFetching: isFetchingMaterial } = useMaterial(props.id);

  if (isLoading) return <SidesheetSkeleton close={props.close} />;
  if (error || !data) return <div>Error loading data</div>;

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader title={data.title} onClose={props.close} />
      <StyledBanner>
        <BannerItem title="Status" value={data.status} />
        {/* Additional banner items */}
      </StyledBanner>

      <CustomStyledTabs activeTab={activeTab} onChange={setActiveTab}>
        <StyledTabListWrapper>
          <StyledTabsList>
            <Tabs.Tab>Details</Tabs.Tab>
            <Tabs.Tab>
              <TabTitle title="Checklists" data={mccr} isLoading={isFetchingMccr} />
            </Tabs.Tab>
            <Tabs.Tab>
              <TabTitle title="Material" data={material} isLoading={isFetchingMaterial} />
            </Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>

        <CustomStyledPanels>
          <StyledPanel><DetailsTab entity={data} /></StyledPanel>
          <StyledPanel><MccrTab mccr={mccr} isFetching={isFetchingMccr} /></StyledPanel>
          <StyledPanel><MaterialTab material={material} isFetching={isFetchingMaterial} /></StyledPanel>
        </CustomStyledPanels>
      </CustomStyledTabs>
    </StyledSideSheetContainer>
  );
};
```

## Data Fetching Hook Pattern

```ts
import { useContextId } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useQuery } from '@tanstack/react-query';
import { <EntityMccr> } from '../types';

export const useMccr = (packageId: string | null) => {
  const ccApp = useHttpClient('cc-app');
  const contextId = useContextId();

  const { data, isFetching, error } = useQuery({
    queryFn: async ({ signal }) => {
      const res = await ccApp.fetch(
        `/api/contexts/${contextId}/<api-route>/${packageId}/checklists`,
        { signal }
      );
      if (!res.ok) throw new Error('Failed to fetch');
      return (await res.json()) as <EntityMccr>[];
    },
    queryKey: ['mccr', packageId],
    enabled: !!packageId,
  });

  return { mccr: data, isFetching, error };
};
```

## Sidesheet Config Wiring (`sidesheetConfig.tsx`)

```tsx
import { <Entity> } from '@cc-components/<appname>shared';
import { SidesheetConfig } from '@equinor/workspace-fusion/sidesheet';
import { <Entity>Sidesheet } from '@cc-components/<appname>sidesheet';

export const sidesheetConfig: SidesheetConfig<<Entity>> = {
  type: 'default',
  DetailsSidesheet: <Entity>Sidesheet,
};
```

## Shared Components

Import layout components from `@cc-components/sharedcomponents`:

| Component | Purpose |
|-----------|---------|
| `StyledSideSheetContainer` | Root container |
| `SidesheetHeader` | Title bar with close button |
| `SidesheetSkeleton` | Loading placeholder |
| `StyledBanner` / `BannerItem` | Key-value banner row |
| `CustomStyledTabs` / `StyledTabsList` / `CustomStyledPanels` | Tab navigation |
| `StyledPanel` | Tab panel wrapper |
| `TabTitle` | Tab label with count badge |

Shared tab components from `@cc-components/shared`:

| Component | Purpose |
|-----------|---------|
| `MccrTab` | Checklists table |
| `MaterialTab` | Materials table |
| `NotificationTab` | Notifications table |
| `ModelViewerTab` | 3D model viewer (from `@cc-components/modelviewer`) |

## Checklist

- [ ] Types defined in `types/` directory
- [ ] Data hooks in `utils-sidesheet/` using `useQuery` from `@tanstack/react-query`
- [ ] HTTP client obtained via `useHttpClient('cc-app')`
- [ ] Context ID obtained via `useContextId()`
- [ ] Main sidesheet component uses shared layout components
- [ ] `sidesheetConfig.tsx` wires sidesheet to workspace
- [ ] Loading state shows `SidesheetSkeleton`
