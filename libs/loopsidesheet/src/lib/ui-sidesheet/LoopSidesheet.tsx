import { Loop } from '@cc-components/loopshared';
import { LinkCell, useContextId, useHttpClient } from '@cc-components/shared';
import { StatusCircle } from '@cc-components/shared/common';
import { statusColorMap } from '@cc-components/shared/mapping';
import { WorkorderTab } from '@cc-components/shared/sidesheet';
import {
  BannerItem,
  CustomStyledPanels,
  CustomStyledTabs,
  SidesheetHeader,
  SidesheetSkeleton,
  StyledBanner,
  StyledPanel,
  StyledSideSheetContainer,
  StyledTabListWrapper,
  StyledTabsList,
  TabTitle,
} from '@cc-components/sharedcomponents';
import { Tabs } from '@equinor/eds-core-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useGetWorkorders } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTab';

export const LoopSidesheet = (props: {
  item?: Loop | undefined;
  id: string;
  close: VoidFunction;
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const client = useHttpClient();
  const contextId = useContextId();
  const {
    data: loop,
    error: sidesheetError,
    isLoading: isLoadingSidesheet,
  } = useQuery<Loop>({
    queryKey: ['loop', props.id],
    queryFn: async () => {
      const res = await client.fetch(`/api/contexts/${contextId}/loop/${props.id}`);
      if (!res.ok) {
        throw res;
      }
      return res.json();
    },
    throwOnError: false,
    initialData: props.item ?? undefined,
  });

  const { data, isLoading, error } = useGetWorkorders(loop?.loopId);

  if (isLoadingSidesheet) {
    return <SidesheetSkeleton close={props.close} />;
  }

  if (!loop || sidesheetError) {
    return <div>Failed to get Loop with id: {props.id}</div>;
  }

  const handleChange = (value: number | string) => {
    const index = typeof value === 'number' ? value : parseInt(value, 10);
    setActiveTab(index);
  };

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={loop.loopNo}
        description={loop.description ?? undefined}
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
                aiLinkLocation="loop sidesheet header"
                aiLinktype="CommPkgNo"
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
                aiLinkLocation="loop sidesheet header"
                aiLinktype="McPkgNo"
              />
            ) : (
              'N/A'
            )
          }
        />
        <BannerItem title="Priority" value={loop.priority1 || 'N/A'} />
      </StyledBanner>
      <CustomStyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList>
            <Tabs.Tab>Overview</Tabs.Tab>
            <Tabs.Tab>
              Work orders <TabTitle isLoading={isLoading} data={data} />
            </Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>
        <CustomStyledPanels>
          <StyledPanel>
            <DetailsTab loop={loop} />
          </StyledPanel>
          <StyledPanel>
            <WorkorderTab error={error} isFetching={isLoading} workorders={data} />
          </StyledPanel>
        </CustomStyledPanels>
      </CustomStyledTabs>
    </StyledSideSheetContainer>
  );
};
