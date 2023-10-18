import { Pipetest } from '@cc-components/pipingshared';
import { createWidget } from '@equinor/workspace-sidesheet';
import { useState } from 'react';
import { Tabs } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { useGetWorkorders } from '../utils-sidesheet';
import { WorkorderBase, WorkorderTab } from '@cc-components/shared/sidesheet';
import { StatusCircle } from '@cc-components/shared/common';
import { pipetestStatusColormap } from '@cc-components/shared/mapping';
import { useQuery } from '@tanstack/react-query';
import { DateCell, useContextId, useHttpClient } from '@cc-components/shared';
import {
  BannerItem,
  SidesheetHeader,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
  TabTitle,
} from '@cc-components/sharedcomponents';
import { InsultaionTab } from './InsultaionTab';
import { ChecklistTab } from './ChecklistTab';

const workorders: WorkorderBase[] = [];

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
  close: () => void;
};

export const PipingSidesheet = createWidget<PipingProps>(({ props }) => {
  const [activeTab, setActiveTab] = useState(0);

  const client = useHttpClient();
  const contextId = useContextId();
  // const { data: pipetest } = useQuery<Pipetest>(
  //   ['pipetest', props.id],
  //   async () => {
  //     const res = await client.fetch(`/api/contexts/${contextId}/pipetest/${props.id}`);
  //     if (!res.ok) {
  //       throw res;
  //     }
  //     return res.json();
  //   },
  //   {
  //     suspense: true,
  //     initialData: props.item,
  //   }
  // );

  const pipetest = props.item;
  if (!pipetest) {
    throw new Error('Pipetest undefined');
  }

  // const { data, isLoading } = useGetWorkorders(pipetest.name);

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={`${pipetest.name}, ${pipetest.description}` || ''}
        onClose={props.close}
        applicationTitle="Pipetest"
      />
      <StyledBanner>
        <BannerItem title="Current step" value={pipetest.step} />
        <BannerItem
          title="Checklist status"
          value={
            pipetest.shortformCompletionStatus ? (
              <StatusCircle
                content={pipetest.shortformCompletionStatus}
                statusColor={pipetestStatusColormap[pipetest.shortformCompletionStatus]}
              />
            ) : (
              'N/A'
            )
          }
        ></BannerItem>
        <BannerItem
          title="RFC"
          value={
            pipetest.rfccPlanned ? <DateCell dateString={pipetest.rfccPlanned} /> : 'N/A'
          }
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
              Insulation
              <TabTitle
                isLoading={false}
                data={[
                  ...(pipetest.pipeInsulationBoxes ?? []),
                  ...(pipetest.insulationBoxes ?? []),
                ]}
                // data={pipetest.insulationBoxes}
              />
            </Tabs.Tab>
            <Tabs.Tab>
              Checklists <TabTitle isLoading={false} data={pipetest.checkLists} />
            </Tabs.Tab>
            <Tabs.Tab>3D</Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>
        <StyledPanels>
          <Tabs.Panel>Circuit diagram is coming</Tabs.Panel>
          <Tabs.Panel>
            <WorkorderTab error={null} isFetching={false} workorders={workorders} />
          </Tabs.Panel>
          <Tabs.Panel>
            <InsultaionTab
              error={null}
              isFetching={false}
              pipeInsulations={pipetest.pipeInsulationBoxes}
              boxInsulations={pipetest.insulationBoxes}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <ChecklistTab
              error={null}
              isFetching={false}
              checklists={pipetest.checkLists}
            />
          </Tabs.Panel>
          <Tabs.Panel>3D is coming</Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
});

export default PipingSidesheet.render;
