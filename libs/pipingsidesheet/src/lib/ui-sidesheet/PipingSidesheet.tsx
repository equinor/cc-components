import { Pipetest } from '@cc-components/pipingshared';
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
import { useContextId, useHttpClient } from '@cc-components/shared';

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
  const { data: pipetest } = useQuery<Pipetest>(
    ['piptest', props.id],
    async () => {
      const res = await client.fetch(`/api/contexts/${contextId}/piping/${props.id}`);
      if (!res.ok) {
        throw res;
      }
      return res.json();
    },
    {
      suspense: true,
      initialData: props.item,
    }
  );

  if (!pipetest) {
    throw new Error('Loop undefined');
  }

  const { data, isLoading } = useGetWorkorders(pipetest.name);

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={`${pipetest.name}, ${pipetest.description}` || ''}
        onClose={props.close}
        applicationTitle="Piping"
      />
      <StyledBanner>
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
        <BannerItem title="Current step" value={pipetest.step ?? ''} />
        <BannerItem title="Checklist status" value={'To be continued'} />
        <BannerItem title="Piping RFC" value={pipetest.rfccPlanned || 'N/A'} />
      </StyledBanner>
      <StyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList>
            <Tabs.Tab>Circuit diagram</Tabs.Tab>
            <Tabs.Tab>
              Work orders <TabTitle isLoading={isLoading} data={data} />
            </Tabs.Tab>
            <Tabs.Tab>Insulation</Tabs.Tab>
            <Tabs.Tab>
              Checklists <TabTitle isLoading={isLoading} data={data} />
            </Tabs.Tab>
            <Tabs.Tab>3D</Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>
        <StyledPanels>
          <Tabs.Panel>Circuit diagram is coming</Tabs.Panel>
          <Tabs.Panel>
            <WorkorderTab error={null} isFetching={false} workorders={data} />
          </Tabs.Panel>
          <Tabs.Panel>Insulation is coming</Tabs.Panel>
          <Tabs.Panel>Checklist is coming</Tabs.Panel>
          <Tabs.Panel>3D is coming</Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
});

export default PipingSidesheet.render;
