import { Pipetest } from '@cc-components/pipingshared';
import { lazy, useState } from 'react';
import { Tabs } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { WorkorderBase, WorkorderTab } from '@cc-components/shared/sidesheet';
import { StatusCircle } from '@cc-components/shared/common';
import { pipetestStatusColormap } from '@cc-components/shared/mapping';
import { DateCell, useContextId, useHttpClient } from '@cc-components/shared';

import {
  BannerItem,
  SidesheetHeader,
  StyledBanner,
  StyledSideSheetContainer,
  CustomStyledTabs,
  CustomStyledPanels,
  TabTitle
} from '@cc-components/sharedcomponents';

import { InsultaionTab } from './InsultaionTab';
import { ChecklistTab } from './ChecklistTab';

import { useGetWorkorders } from '../utils-sidesheet';
import { useGetChecklists } from '../utils-sidesheet/useGetChecklists';
import { useGetPipetest } from '../utils-sidesheet/usePipetest';

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

type PipingProps = {
  id: string;
  item?: Pipetest;
  close: VoidFunction;
};

export const PipingSidesheet = (props: PipingProps) => {
  const { id, item, close } = props;

  const [activeTab, setActiveTab] = useState(0);

  const { data: pipetest, isLoading: isLoadingPipetest, error: errorPipetest } = useGetPipetest(id, item)

  const { data : workorders, isLoading: isLoadingWorkorders, error: errorWorkorders } = useGetWorkorders(pipetest?.pipetestMc);

  const { data: checklists, isLoading: isLoadingChecklists, error: errorChecklists } = useGetChecklists(pipetest?.pipetestMc);

  // TODO: Fetch Insulation Boxes

  console.log({workorders, checklists, isLoadingWorkorders, isLoadingChecklists});

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={`${pipetest?.pipetestMc}, ${pipetest?.description}` || ''}
        onClose={props.close}
        applicationTitle="Pipetest"
      />
      <StyledBanner>
        <BannerItem title="Current step" value="TODO" /> { /* value={pipetest.step} */ }
        <BannerItem
          title="Checklist status"
          value="TODO" />
        { /* 
        TODO:
                    pipetest.shortformCompletionStatus ? (
              <StatusCircle
                content={pipetest.shortformCompletionStatus}
                statusColor={pipetestStatusColormap[pipetest.shortformCompletionStatus]}
              />
            ) : (
              'N/A'
            )
        */} 
        <BannerItem
          title="RFC"
          value={pipetest?.rfCPlannedForecastDate ? <DateCell dateString={pipetest?.rfCPlannedForecastDate} /> : 'N/A'}
        />
      </StyledBanner>
      <CustomStyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList>
            <Tabs.Tab>Circuit diagram</Tabs.Tab>
            <Tabs.Tab>
              Work orders 
              <TabTitle isLoading={false} data={workorders} />
            </Tabs.Tab>
            <Tabs.Tab>
              Insulation 
              <TabTitle isLoading={false} data={[]} />
                { /*
                  data={[ ...(pipetest.pipeInsulationBoxes ?? []), ...(pipetest.insulationBoxes ?? []),
                  ]}
              */}
            </Tabs.Tab>
            <Tabs.Tab>
              Checklists 
              <TabTitle isLoading={false} data={checklists} />
            </Tabs.Tab>
            <Tabs.Tab>3D</Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>
        <CustomStyledPanels>
          <Tabs.Panel>Circuit diagram is coming</Tabs.Panel>
          <Tabs.Panel>
            <WorkorderTab 
              error={errorWorkorders} 
              isFetching={isLoadingWorkorders} 
              workorders={workorders} />
          </Tabs.Panel>
          <Tabs.Panel>
            <InsultaionTab
              error={null}
              isFetching={false}
              pipeInsulations={[]} 
              boxInsulations={[]} />
          </Tabs.Panel>
          <Tabs.Panel>
            <ChecklistTab
              error={errorChecklists}
              isFetching={isLoadingChecklists}
              checklists={checklists} />
          </Tabs.Panel>
          <Tabs.Panel>3D is coming</Tabs.Panel>
        </CustomStyledPanels>
      </CustomStyledTabs>
    </StyledSideSheetContainer>
  );
};
