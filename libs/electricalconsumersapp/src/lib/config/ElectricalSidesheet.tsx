import { ElectricalConsumer } from './workspaceConfig';
import { useContextId, useHttpClient, ElectricalNetwork } from '@cc-components/shared';
import {
  BannerItem,
  SidesheetHeader,
  StyledBanner,
  StyledSideSheetContainer,
  StyledTabs,
  StyledPanels,
  TabTitle,
  StyledTabsList,
  StyledTabListWrapper,
} from '@cc-components/sharedcomponents';
import { useQuery } from '@tanstack/react-query';
import { SidesheetSkeleton } from '@cc-components/sharedcomponents';
import { useRef, useState } from 'react';
import { Tabs } from '@equinor/eds-core-react';
import { useResizeContext } from '@equinor/workspace-fusion';
import { CircuitDiagramTab } from '../sidesheet/CircuitDiagramTab';

export function ElectricalSidesheet({
  item,
  id,
  close,
}: {
  item?: ElectricalConsumer | undefined;
  id: string;
  close: VoidFunction;
}) {
  const { width, setWidth } = useResizeContext();
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (index: number) => {
    setActiveTab(index);
  };
  const reszied = useRef({ hasResized: false, id: id });
  if (reszied.current.id !== id) {
    reszied.current = { hasResized: false, id: id };
    setWidth(700);
  }

  const client = useHttpClient();
  const context = useContextId();

  const [itemNo, facility, project] = id.split('_');

  if (!facility || !itemNo) {
    close();
    return <></>;
  }

  const { data: elenetwork, isLoading: isLoadingEle } =
    useQuery<ElectricalNetwork | null>(
      /**Change facility to project */
      /** facility*/ [itemNo, facility, project],
      async ({ signal }) => {
        const res = await client.fetch(
          `api/contexts/${context}/electrical/consumers/electrical-network/${encodeURIComponent(
            itemNo
          )}/${facility}`,
          { signal }
        );

        if (res.status === 204) {
          return null;
        }

        if (!res.ok) {
          if (res.status === 404) {
            return null;
          }
          throw new Error('Failed to fetch elenetwork');
        }
        return res.json();
      },
      {
        suspense: false,
        useErrorBoundary: false,
      }
    );

  const { data: consumer, isLoading } = useQuery<ElectricalConsumer>(
    /**Change facility to project */
    /** facility*/ [id],
    async ({ signal }) => {
      const res = await client.fetch(
        `api/contexts/${context}/electrical/consumers/${facility}/${project}/${itemNo}`,
        { signal }
      );
      if (!res.ok) {
        throw new Error('Failed to fetch consumer');
      }
      return res.json();
    },
    {
      suspense: false,
      useErrorBoundary: false,
      initialData: item ?? undefined,
    }
  );

  if (isLoading) {
    return <SidesheetSkeleton close={close} />;
  }

  if (!consumer) {
    return <div>uhoh</div>;
  }

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={consumer.tagNo}
        applicationTitle={'Electrical consumers'}
        onClose={close}
      />
      <StyledBanner>
        <BannerItem title="Facility" value={consumer.instCode} />
        <BannerItem title="Status" value={consumer.tagStatus} />
        <BannerItem title="Symbol code" value={consumer.componentType} />
        <BannerItem title="McPkg" value={consumer.mechanicalCompletionPackageNo ?? ''} />
        <BannerItem title="CommPkg" value={consumer.commissioningPackageNo ?? ''} />
      </StyledBanner>
      <StyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList>
            <Tabs.Tab>
              CircuitDiagram
              <TabTitle isLoading={isLoadingEle} data={elenetwork == null ? [] : [{}]} />
            </Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>

        <StyledPanels>
          <Tabs.Panel>
            <CircuitDiagramTab
              elenetwork={elenetwork}
              itemNo={consumer.tagNo}
              onCircuitDiagramReady={(element) => {
                if (reszied.current.hasResized) return;
                const newWidth = element.scrollWidth;
                if (width !== 700) return;
                setWidth(newWidth + 50);
                reszied.current = { hasResized: true, id: id };
              }}
            />
          </Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
}
