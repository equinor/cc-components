import { HeatTrace } from '@cc-components/heattraceshared';
import { createWidget } from '@equinor/workspace-sidesheet';
import { useState } from 'react';
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
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
  TabTitle,
} from '@cc-components/sharedcomponents';

import { Workorder } from '../types';
import { ChecklistTab } from './ChecklistTab';
import { useGetHeatTraceChecklists } from '../utils-sidesheet/useGetChecklists';
import { useQuery } from '@tanstack/react-query';
import { CircuitDiagramTab } from './CircuitDiagramTab';

const workorders: Workorder[] = [];

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
  const heattrace = props.item;

  if (!heattrace) {
    throw new Error('Heat Trace undefined');
  }

  const htNo = heattrace.heatTraceCableNo;
  const facility = heattrace.facility;
  const project = heattrace.project;

  const { dataChecklists, errorChecklists, isLoadingChecklists } =
    useGetHeatTraceChecklists(props.item?.heatTraceCableId ?? '');

  const client = useHttpClient();
  const contextId = useContextId();

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
        title={`${heattrace.heatTraceCableNo} - ${heattrace.heatTraceCableDescription}`}
        onClose={props.close}
        applicationTitle="Heat Trace"
      />
      <StyledBanner>
        <BannerItem title="Checklist status" value={heattrace.status} />
        <BannerItem
          title="Comm Pkg"
          value={
            heattrace.commissioningPackageNo ? (
              <LinkCell
                url={heattrace.commissioningPackageUrl ?? ''}
                urlText={heattrace.commissioningPackageNo}
              />
            ) : (
              'N/A'
            )
          }
        ></BannerItem>
        <BannerItem
          title="MC Pkg"
          value={
            heattrace.mechanicalCompletionPackageNo ? (
              <LinkCell
                url={heattrace.mechanicalCompletionUrl ?? ''}
                urlText={heattrace.mechanicalCompletionPackageNo}
              />
            ) : (
              'N/A'
            )
          }
        />
        <BannerItem title="Priority1" value={heattrace.priority1 ?? 'N/A'} />
      </StyledBanner>
      <StyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList>
            <Tabs.Tab>Circuit diagram</Tabs.Tab>
            <Tabs.Tab>
              Work orders <TabTitle isLoading={false} data={workorders} />
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
            <CircuitDiagramTab elenetwork={elenetwork} itemNo={htNo} />
          </Tabs.Panel>
          <Tabs.Panel>
            <WorkorderTab
              error={null}
              isFetching={false}
              workorders={[]}
              // workorders={workorders}
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
