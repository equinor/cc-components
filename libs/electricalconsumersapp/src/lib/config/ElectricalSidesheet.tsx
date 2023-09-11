import { createWidget } from '@equinor/workspace-sidesheet';
import { ElectricalConsumer } from './workspaceConfig';
import {
  BannerItem,
  SidesheetHeader,
  StyledBanner,
  StyledSideSheetContainer,
  StyledTabs,
  useContextId,
  useHttpClient,
  StyledPanels,
  TabTitle,
  CircuitDiagram,
  ElectricalNetwork,
} from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { SidesheetSkeleton } from '@cc-components/sharedcomponents';
import { useState } from 'react';
import { TabListProps, Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const StyledTabListWrapper: (props: any) => JSX.Element = styled.div`
  overflow: hidden;
  width: 100%;
  background-color: ${tokens.colors.ui.background__light.hex};
`;
export const StyledTabsList: (props: TabListProps) => JSX.Element = styled(Tabs.List)`
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  scroll-behavior: smooth;
`;

export const ElectricalSidesheet = createWidget<{
  close: VoidFunction;
  item?: ElectricalConsumer;
  id: string;
}>((props) => {
  return (
    <Test
      item={props.props.item}
      id={props.props.id}
      closeSidesheet={props.props.close}
    />
  );
});

export function Test({
  item,
  id,
  closeSidesheet,
}: {
  item: ElectricalConsumer | undefined;
  id: string;
  closeSidesheet: VoidFunction;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (index: number) => {
    setActiveTab(index);
  };
  const client = useHttpClient();
  const context = useContextId();

  const [itemId, facility] = id.split('_');

  if (!facility || !itemId) {
    closeSidesheet();
    return <></>;
  }

  const { data: elenetwork, isLoading: isLoadingEle } = useQuery<ElectricalNetwork>(
    /**Change facility to project */
    /** facility*/ [itemId, facility],
    async ({ signal }) => {
      const res = await client.fetch(
        `api/contexts/${context}/electrical/consumers/electrical-network/${encodeURIComponent(
          itemId
        )}/${facility}`,
        { signal }
      );
      if (!res.ok) {
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
        `api/contexts/${context}/electrical/consumers/${facility}/${itemId}`,
        { signal }
      );
      if (!res.ok) {
        throw new Error('Failed to fetch consumers');
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
    return <SidesheetSkeleton close={closeSidesheet} />;
  }

  if (!consumer) {
    return <div>uhoh</div>;
  }

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={consumer.tagNo}
        applicationTitle={'Electrical consumers'}
        onClose={closeSidesheet}
      />
      <StyledBanner>
        <BannerItem title="Facility" value={consumer.instCode} />
        <BannerItem title="Status" value={consumer.tagStatus} />
        <BannerItem title="Symbol code" value={consumer.componentType} />
      </StyledBanner>
      <StyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList>
            <Tabs.Tab>
              CircuitDiagram <TabTitle isLoading={true} data={undefined} />
            </Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>

        <StyledPanels>
          <Tabs.Panel>{elenetwork && <CircuitDiagram network={elenetwork} />}</Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
}
