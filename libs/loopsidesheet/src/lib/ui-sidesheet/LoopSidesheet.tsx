import { Loop } from '@cc-components/loopshared';
import { createWidget } from '@equinor/workspace-sidesheet';
import {
  BannerItem,
  proCoSysUrls,
  SidesheetHeader,
  StatusCircle,
  statusColorMap,
  StyledBanner,
  StyledItemLink,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
  TabTitle,
  WorkorderTab,
} from '@cc-components/shared';
import { useState } from 'react';
import { DetailsTab } from './DetailsTab';
import { Tabs } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { useGetWorkorders } from '../utils-sidesheet';
import { Checklists } from './Checklists';
import { ContentDetails } from './ContentDetails';

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
  item?: Loop;
  close: () => void;
};

export const LoopSidesheet = createWidget<LoopProps>(({ frame, props }) => {
  const [activeTab, setActiveTab] = useState(0);

  const { data, error, isLoading } = useGetWorkorders();

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={`${props?.item?.loopNo}, ${props?.item?.description}` || ''}
        onClose={props.close}
      />
      <StyledBanner>
        <BannerItem
          title="Checklist status"
          value={
            props.item?.status ? (
              <StatusCircle
                content={props.item?.status}
                statusColor={statusColorMap[props.item?.status]}
              />
            ) : (
              'N/A'
            )
          }
        ></BannerItem>
        <BannerItem
          title="Cmpkg"
          value={
            props.item?.commissioningPackageNo ? (
              <StyledItemLink
                target="_blank"
                href={proCoSysUrls.getCommPkgUrl(
                  props.item?.commissioningPackageUrlId ?? ''
                )}
              >
                {props.item?.commissioningPackageNo}
              </StyledItemLink>
            ) : (
              'N/A'
            )
          }
        />
        <BannerItem
          title="Mcpkg"
          value={
            props.item?.mechanicalCompletionPackageNo ? (
              <StyledItemLink
                target="_blank"
                href={proCoSysUrls.getMcUrl(
                  props.item?.mechanicalCompletionPackageUrlId ?? ''
                )}
              >
                {props.item?.mechanicalCompletionPackageNo}
              </StyledItemLink>
            ) : (
              'N/A'
            )
          }
        />
        <BannerItem title="Milestone" value={props.item?.priority1 || 'N/A'} />
      </StyledBanner>
      <StyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList>
            <Tabs.Tab>Overview</Tabs.Tab>
            <Tabs.Tab>
              Work orders <TabTitle isLoading={isLoading} data={data} />
            </Tabs.Tab>
            <Tabs.Tab>3D</Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>
        <StyledPanels>
          <Tabs.Panel>
            <DetailsTab loop={props.item} />
            {props.item?.loopId && <Checklists loopId={props.item.loopId} />}
            <ContentDetails loop={props.item} />
          </Tabs.Panel>
          <Tabs.Panel>
            <WorkorderTab error={null} isFetching={false} workorders={data} />
          </Tabs.Panel>
          <Tabs.Panel>Work in progress...</Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
});

export default LoopSidesheet.render;
