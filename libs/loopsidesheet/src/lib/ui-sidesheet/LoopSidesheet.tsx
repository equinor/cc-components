import { Loop } from '@cc-components/loopshared';
import { createWidget } from '@equinor/workspace-sidesheet';

import { useState } from 'react';
import { DetailsTab } from './DetailsTab';
import { Tabs } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { useGetWorkorders } from '../utils-sidesheet';
import { Checklists } from './Checklists';
import { ContentDetails } from './ContentDetails';
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
import { statusColorMap } from '@cc-components/shared/mapping';
import { useQuery } from '@tanstack/react-query';
import { LinkCell, useContextId, useHttpClient } from '@cc-components/shared';
import { SidesheetSkeleton } from '@cc-components/sharedcomponents';

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

type LoopProps = {
  id: string;
  item: Loop | null;
  close: () => void;
};

export const LoopSidesheet = createWidget<LoopProps>(({ props }) => {
  const [activeTab, setActiveTab] = useState(0);

  const client = useHttpClient();
  const contextId = useContextId();
  const {
    data: loop,
    error: sidesheetError,
    isLoading: isLoadingSidesheet,
  } = useQuery<Loop>(
    ['loop', props.id],
    async () => {
      const res = await client.fetch(`/api/contexts/${contextId}/loop/${props.id}`);
      if (!res.ok) {
        throw res;
      }
      return res.json();
    },
    {
      suspense: false,
      initialData: props.item ?? undefined,
      useErrorBoundary: false,
    }
  );

  const { data, isLoading, error } = useGetWorkorders(loop?.loopNo);

  if (isLoadingSidesheet) {
    return <SidesheetSkeleton close={props.close} />;
  }

  if (!loop || sidesheetError) {
    return <div>Failed to get Loop with id: {props.id}</div>;
  }

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={`${loop.loopNo}, ${loop.description}` || ''}
        onClose={props.close}
        applicationTitle="Loop"
      />
      <StyledBanner>
        <BannerItem
          title="Checklist status"
          value={
            loop.status ? (
              <StatusCircle
                content={loop.status}
                statusColor={statusColorMap[loop.status]}
              />
            ) : (
              'N/A'
            )
          }
        ></BannerItem>
        <BannerItem
          title="Comm Pkg"
          value={
            loop.commissioningPackageNo ? (
              <LinkCell
                url={loop.commissioningPackageUrl}
                urlText={loop.commissioningPackageNo}
              />
            ) : (
              'N/A'
            )
          }
        />
        <BannerItem
          title="MC Pkg"
          value={
            loop.mechanicalCompletionPackageNo ? (
              <LinkCell
                url={loop.mechanicalCompletionPackageUrl}
                urlText={loop.mechanicalCompletionPackageNo}
              />
            ) : (
              'N/A'
            )
          }
        />
        <BannerItem title="Priority" value={loop.priority1 || 'N/A'} />
      </StyledBanner>
      <StyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList>
            <Tabs.Tab>Overview</Tabs.Tab>
            <Tabs.Tab>
              Work orders <TabTitle isLoading={isLoading} data={data} />
            </Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>
        <StyledPanels>
          <Tabs.Panel>
            <DetailsTab loop={loop} />
            {loop.loopId && <Checklists loopId={loop.loopId} />}
            <ContentDetails loop={loop} />
          </Tabs.Panel>
          <Tabs.Panel>
            <WorkorderTab error={error} isFetching={isLoading} workorders={data} />
          </Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
});

export default LoopSidesheet.render;
