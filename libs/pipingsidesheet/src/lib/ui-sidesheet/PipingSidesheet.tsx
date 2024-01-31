import { Pipetest } from '@cc-components/pipingshared';
import { useState } from 'react';
import { Tabs } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { WorkorderTab } from '@cc-components/shared/sidesheet';
import { DateCell } from '@cc-components/shared';

import {
  BannerItem,
  SidesheetHeader,
  StyledBanner,
  StyledSideSheetContainer,
  CustomStyledTabs,
  CustomStyledPanels,
  TabTitle,
  SidesheetSkeleton,
} from '@cc-components/sharedcomponents';

import { InsultaionTab } from './InsultaionTab';
import { ChecklistTab } from './ChecklistTab';

import { useGetWorkorders } from '../utils-sidesheet';
import { useGetChecklists } from '../utils-sidesheet/useGetChecklists';
import { useGetPipetest } from '../utils-sidesheet/usePipetest';
import { useGetInsulationTags } from '../utils-sidesheet/useGetInsulationTags';
import { useElectricalNetworks } from '../utils-sidesheet/useElectricalNetwork';
import { ElecticalNetworkTab } from './ElectricalNetworkTab';

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

const PipingSidesheetContent = (props: Required<PipingProps>) => {
  const { item, close } = props;

  const [activeTab, setActiveTab] = useState(0);

  const {
    data: workorders,
    isLoading: isLoadingWorkorders,
    error: errorWorkorders,
  } = useGetWorkorders(item.pipetestMc);

  const {
    data: checklists,
    isLoading: isLoadingChecklists,
    error: errorChecklists,
  } = useGetChecklists(item.pipetestMc);

  const {
    data: insulationTags,
    isLoading: isLoadingInsulationTags,
    error: errorInsulationTags,
  } = useGetInsulationTags(item.pipetestMc);

  const {
    data: electricalNetworks,
    isLoading: isLoadingElecticalNetworks,
    error: errorElectricalNetworks,
  } = useElectricalNetworks(item.facility, ['HT216013A', 'HT216013B', 'HT216378']);

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={`${item.pipetestMc}, ${item.description}` || ''}
        onClose={close}
        applicationTitle="Pipetest"
      />
      <StyledBanner>
        <BannerItem title="Current step" value="TODO" /> {/* value={pipetest.step} */}
        <BannerItem title="Checklist status" value="TODO" />
        {/* 
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
          value={
            item.rfCPlannedForecastDate ? (
              <DateCell dateString={item.rfCPlannedForecastDate} />
            ) : (
              'N/A'
            )
          }
        />
      </StyledBanner>
      <CustomStyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList>
            <Tabs.Tab>Circuit diagram</Tabs.Tab>
            <Tabs.Tab>
              Work orders
              <TabTitle isLoading={isLoadingWorkorders} data={workorders} />
            </Tabs.Tab>
            <Tabs.Tab>
              Insulation
              <TabTitle
                isLoading={isLoadingInsulationTags}
                data={
                  insulationTags
                    ? [
                        ...insulationTags.boxInsulationTags,
                        ...insulationTags.pipeInsulationTags,
                      ]
                    : []
                }
              />
            </Tabs.Tab>
            <Tabs.Tab>
              Checklists
              <TabTitle isLoading={isLoadingChecklists} data={checklists} />
            </Tabs.Tab>
            <Tabs.Tab>3D</Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>
        <CustomStyledPanels>
          <Tabs.Panel>
            <ElecticalNetworkTab
              itemNo="HT216013B" // TODO: Use HT Calbe link when ready
              networks={electricalNetworks}
              isFetching={isLoadingElecticalNetworks}
              error={errorElectricalNetworks}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <WorkorderTab
              error={errorWorkorders}
              isFetching={isLoadingWorkorders}
              workorders={workorders}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <InsultaionTab
              error={errorInsulationTags}
              isFetching={isLoadingInsulationTags}
              insulationTags={insulationTags}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <ChecklistTab
              error={errorChecklists}
              isFetching={isLoadingChecklists}
              checklists={checklists}
            />
          </Tabs.Panel>
          <Tabs.Panel>3D is coming</Tabs.Panel>
        </CustomStyledPanels>
      </CustomStyledTabs>
    </StyledSideSheetContainer>
  );
};


export const PipingSidesheet = (props: PipingProps) => {
  const { id, item, close } = props;

  const { data, isLoading, error } = useGetPipetest(id, item)

  if (isLoading) {
    return <SidesheetSkeleton close={close} />;
  }

  if (!data || error) {
    return <div>Failed to get Pipetest with id: {id}</div>;
  }

  return (<PipingSidesheetContent id={id} item={data} close={close} />);
};
