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

  const facility = id.split('_').at(1);
  const itemId = id.split('_').at(0);

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
          <Tabs.Panel>
            {elenetwork && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  margin: '20px',
                }}
              >
                <CircuitDiagram network={elenetwork} />
              </div>
            )}
          </Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
}

export type ElectricalNetwork = {
  eleSymbolCode:
    | 'K_BOX'
    | 'HT_KAB'
    | 'KURS'
    | 'TAVLE'
    | 'KABEL'
    | 'VARME'
    | ({} & string);
  type: string;
  name: string;
  urlPath: string;
  busId: string | null;
  tagNoSwb: string | null;
  cubicleId: string | null;
  drawerId: string | null;
  status: string | null;
  tagStatus: string;
  description: string | null;
  hasChildren: boolean;
  isHighlighted: boolean;
  isSafetyCritical: boolean;
  fuseSize: string | null;
  locationCode: string | null;
  phases: string | null;
  htrcTypeCode: string | null;
  installedLength: string | null;
  cableSize: string | null;
  eleNetId: ElenetId | null;
  tags: Tag[];
  children: ElectricalNetwork[];
};

export interface ElenetId {
  instCode: string;
  tagNo: string;
  cubicleId: string;
  drawerId: string | null;
  branchId: number;
}

export type Tag = {
  tagNo: string;
  urlPath: string;
  tagStatus: string;
  cableSize: any;
  cableType: any;
  cableCode: any;
  cableLengthInst: any;
  isHighlighted: boolean;
  isSafetyCritical: boolean;
};
