import { HeatTrace } from '@cc-components/heattraceshared';
import { createWidget } from '@equinor/workspace-sidesheet';
import { useState } from 'react';
import { Tabs } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { useGetWorkorders } from '../utils-sidesheet';
import {
  BannerItem,
  SidesheetHeader,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
  TabTitle,
  WorkorderTab,
} from '@cc-components/shared/sidesheet';
import { StatusCircle } from '@cc-components/shared/common';
import { pipetestStatusColormap } from '@cc-components/shared/mapping';
import { useQuery } from '@tanstack/react-query';
import { DateCell, useContextId, useHttpClient } from '@cc-components/shared';

import { Workorder } from '../types';
import { ChecklistTab } from './ChecklistTab';
// import data from '../utils-sidesheet/workorderResponse.json' assert { type: 'json' };

// const workorders: Workorder[] = data as any;
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

  const client = useHttpClient();
  const contextId = useContextId();

  const heattrace = props.item;
  if (!heattrace) {
    throw new Error('Heat Trace undefined');
  }

  // const { data, isLoading } = useGetWorkorders(heattrace.heatTraceCableNo);

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={`${heattrace.heatTraceCableNo}, ${heattrace.heatTraceCableDescription}`}
        onClose={props.close}
        applicationTitle="Heat Trace"
      />
      <StyledBanner>
        <BannerItem
          title="Current step"
          value="heattrace.step"
          // value={heattrace.step}
        />
        <BannerItem
          title="Checklist status"
          value="heattrace.shortform"
          // {
          // heattrace.shortformCompletionStatus ? (
          // <StatusCircle
          //     content={heattrace.shortformCompletionStatus}
          //     statusColor={pipetestStatusColormap[heattrace.shortformCompletionStatus]}
          //   />
          // ) : (
          //   'N/A'
          // )
          // }
        ></BannerItem>
        <BannerItem
          title="Heattrace RFC"
          value="heattrace.rffcplanned"
          // {
          // heattrace.rfccPlanned ? (
          //   <DateCell dateString={heattrace.rfccPlanned} />
          //   ) : (
          //     'N/A'
          //   )
          // }
        />
      </StyledBanner>
      <StyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList>
            <Tabs.Tab>Circuit diagram</Tabs.Tab>
            <Tabs.Tab>
              Work orders <TabTitle isLoading={false} data={workorders} />
            </Tabs.Tab>
            <Tabs.Tab>
              Checklists{' '}
              <TabTitle
                isLoading={false}
                data={[]}
                // data={heattrace.checkLists}
              />
            </Tabs.Tab>
            <Tabs.Tab>3D</Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>
        <StyledPanels>
          <Tabs.Panel>Circuit diagram is coming</Tabs.Panel>
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
              error={null}
              isFetching={false}
              checklists={[]}
              // checklists={heattrace.checkLists}
            />
          </Tabs.Panel>
          <Tabs.Panel>3D is coming</Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
});

export default HeattraceSidesheet.render;
