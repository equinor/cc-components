import { HeatTrace } from '@cc-components/heattraceshared';
import { createWidget, useResizeContext } from '@equinor/workspace-sidesheet';
import { useRef, useState } from 'react';
import { Tabs } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { useGetWorkorders } from '../utils-sidesheet';
import { WorkorderTab } from '@cc-components/shared/sidesheet';
import {
  ElectricalNetwork,
  LinkCell,
  useContextId,
  useHttpClient,
} from '@cc-components/shared';
import {
  BannerItem,
  SidesheetHeader,
  SidesheetSkeleton,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
  TabTitle,
} from '@cc-components/sharedcomponents';
import { ChecklistTab } from './ChecklistTab';
import { useGetHeatTraceChecklists } from '../utils-sidesheet/useGetChecklists';
import { useQuery } from '@tanstack/react-query';
import { CircuitDiagramTab } from './CircuitDiagramTab';

export const StyledTabListWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  background-color: ${tokens.colors.ui.background__light.hex};
`;
export const StyledTabsList = styled(Tabs.List)`
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  scroll-behavior: smooth;
`;

type HeatTraceProps = {
  id: string;
  item?: HeatTrace;
  close: () => void;
};

export const HeattraceSidesheet = createWidget<HeatTraceProps>(({ props }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { width, setWidth } = useResizeContext();
  const {
    data: heatTrace,
    error,
    isLoading: isLoadingSidesheet,
  } = useQuery(
    ['heat-trace', props.id],
    async () => {
      const res = await client.fetch(`/api/contexts/${contextId}/heat-trace/${props.id}`);
      if (!res.ok) throw res;
      return res.json() as Promise<HeatTrace>;
    },
    {
      suspense: false,
      initialData: props.item ?? undefined,
      useErrorBoundary: false,
    }
  );

  if (isLoadingSidesheet) {
    return <SidesheetSkeleton close={props.close} />;
  }

  if (!heatTrace || error) {
    return <div>Failed to get Heat Trace with id: {props.id}</div>;
  }

  const htNo = heatTrace.heatTraceCableNo;
  const facility = heatTrace.facility;
  const project = heatTrace.project;

  const { dataWorkorders, errorWorkorders, isLoadingWorkorders } = useGetWorkorders(
    props.item?.heatTraceCableId ?? ''
  );

  const { dataChecklists, errorChecklists, isLoadingChecklists } =
    useGetHeatTraceChecklists(props.item?.heatTraceCableId ?? '');

  const client = useHttpClient();
  const contextId = useContextId();

  const reszied = useRef({ hasResized: false, id: props.id });
  if (reszied.current.id !== props.id) {
    reszied.current = { hasResized: false, id: props.id };
    setWidth(700);
  }

  const { data: elenetwork, isLoading: isLoadingEle } =
    useQuery<ElectricalNetwork | null>(
      /**Change facility to project */
      /** facility*/ [htNo, facility, project],
      async ({ signal }) => {
        const res = await client.fetch(
          `api/contexts/${contextId}/electrical/consumers/electrical-network/${encodeURIComponent(
            htNo
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

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={`${heatTrace.heatTraceCableNo} - ${heatTrace.heatTraceCableDescription}`}
        onClose={props.close}
        applicationTitle="Heat Trace"
      />
      <StyledBanner>
        <BannerItem title="Checklist status" value={heatTrace.formStatus || 'N/A'} />
        <BannerItem
          title="Comm Pkg"
          value={
            heatTrace.commissioningPackageNo ? (
              <LinkCell
                url={heatTrace.commissioningPackageUrl ?? ''}
                urlText={heatTrace.commissioningPackageNo}
              />
            ) : (
              'N/A'
            )
          }
        ></BannerItem>
        <BannerItem
          title="MC Pkg"
          value={
            heatTrace.mechanicalCompletionPackageNo ? (
              <LinkCell
                url={heatTrace.mechanicalCompletionUrl ?? ''}
                urlText={heatTrace.mechanicalCompletionPackageNo}
              />
            ) : (
              'N/A'
            )
          }
        />
        <BannerItem title="Priority1" value={heatTrace.priority1 ?? 'N/A'} />
      </StyledBanner>
      <StyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList>
            <Tabs.Tab>Circuit diagram</Tabs.Tab>
            <Tabs.Tab>
              Work orders
              <TabTitle isLoading={isLoadingWorkorders} data={dataWorkorders} />
            </Tabs.Tab>
            <Tabs.Tab>
              Checklists
              <TabTitle isLoading={isLoadingChecklists} data={dataChecklists} />
            </Tabs.Tab>
            <Tabs.Tab>3D</Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>
        <StyledPanels>
          <Tabs.Panel>
            <CircuitDiagramTab
              elenetwork={elenetwork}
              itemNo={htNo}
              onCircuitDiagramReady={(element) => {
                if (reszied.current.hasResized) return;
                const newWidth = element.scrollWidth;
                if (width !== 700) return;
                setWidth(newWidth + 50);
                reszied.current = { hasResized: true, id: props.id };
              }}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <WorkorderTab
              error={errorWorkorders}
              isFetching={isLoadingWorkorders}
              workorders={dataWorkorders}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <ChecklistTab
              error={errorChecklists}
              isFetching={isLoadingChecklists}
              checklists={dataChecklists}
            />
          </Tabs.Panel>
          <Tabs.Panel>3D is coming</Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
});

export default HeattraceSidesheet.render;
