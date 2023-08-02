import { McPackage } from '@cc-components/mechanicalcompletionshared';
import { StatusCircle } from '@cc-components/shared/common';
import { statusColorMap } from '@cc-components/shared/mapping';
import {
  BannerItem,
  NcrTab,
  PunchTab,
  SidesheetHeader,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
  TabTitle,
  WorkorderBase,
  WorkorderTab,
} from '@cc-components/shared/sidesheet';
import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { createWidget } from '@equinor/workspace-sidesheet';
import { useState } from 'react';
import styled from 'styled-components';
import { useMcResource } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTab';
const StyledTabListWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  background-color: ${tokens.colors.ui.background__light.hex};
`;
type McSidesheetProps = {
  id: string;
  item?: McPackage;
  closeSidesheet: () => void;
};
export const McSideSheet = createWidget<McSidesheetProps>(({ props }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  const {
    data: workOrders,
    isFetching: isFetchingWorkOrders,
    error: workOrderError,
  } = useMcResource(props.id, 'work-orders');

  const {
    data: punchItems,
    isFetching: isFetchingPunchItems,
    error: punchError,
  } = useMcResource(props.id, 'punch');
  const {
    data: ncr,
    isFetching: isFetchingNcr,
    error: ncrError,
  } = useMcResource(props.id, 'ncr');

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={props?.item?.description || ''}
        applicationTitle={'Mechanical completion'}
        onClose={props.closeSidesheet}
      />
      <StyledBanner>
        <BannerItem
          title="MC pkg"
          value={
            props.item?.mcPkgNumber ?? 'N/A'
            // <StyledItemLink href={proCoSysUrls.getMcUrl(props.id)} target="_blank">
            //   {props.item?.mcPkgNumber ?? 'N/A'}
            // </StyledItemLink>
          }
        />
        <BannerItem
          title="Comm pkg"
          value={
            props.item?.commPkgNumber ?? 'N/A'
            // <StyledItemLink
            //   href={proCoSysUrls.getCommPkgUrl(props.item?.commPkgId ?? '')}
            //   target="_blank"
            // >
            //   {props.item?.commPkgNumber}
            // </StyledItemLink>
          }
        />
        <BannerItem
          title="MC status"
          value={
            <StatusCircle
              content={props.item?.mcStatus ?? 'N/A'}
              statusColor={
                props.item?.mcStatus
                  ? statusColorMap[props.item?.mcStatus]
                  : 'transparent'
              }
            />
          }
        />
        <BannerItem
          title="Comm status"
          value={
            <StatusCircle
              content={props.item?.commPkgStatus ?? 'N/A'}
              statusColor={
                props.item?.commPkgStatus
                  ? statusColorMap[props.item?.commPkgStatus]
                  : 'transparent'
              }
            />
          }
        />
      </StyledBanner>
      <StyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <Tabs.List>
            <Tabs.Tab>Details</Tabs.Tab>
            <Tabs.Tab>
              Workorders <TabTitle data={workOrders} isLoading={isFetchingWorkOrders} />
            </Tabs.Tab>
            <Tabs.Tab>
              Punch <TabTitle data={punchItems} isLoading={isFetchingPunchItems} />
            </Tabs.Tab>
            <Tabs.Tab>
              NCR <TabTitle data={ncr} isLoading={isFetchingNcr} />
            </Tabs.Tab>
          </Tabs.List>
        </StyledTabListWrapper>

        <StyledPanels>
          <Tabs.Panel>
            <DetailsTab mcPackage={props?.item} />
          </Tabs.Panel>
          <Tabs.Panel>
            <WorkorderTab
              error={workOrderError}
              isFetching={isFetchingWorkOrders}
              workorders={(workOrders ?? []).map(
                (workorder): WorkorderBase => ({
                  ...workorder,
                  workOrderUrl: workorder.url,
                  workOrderNumber: workorder.workOrderNumber,
                  actualCompletionDate: '',
                  discipline: '',
                  estimatedHours: null,
                  jobStatus: '',
                  remainingHours: null,
                  title: workorder.description,
                  workOrderUrlId: workorder.workOrderId,
                  projectProgress: workorder.projectProgress,
                  plannedFinishDate: workorder.plannedCompletionDate
                })
              )}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <PunchTab
              error={punchError}
              isFetching={isFetchingPunchItems}
              punches={punchItems}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <NcrTab error={ncrError} isFetching={isFetchingNcr} ncrs={ncr} />
          </Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
});

export default McSideSheet.render;
