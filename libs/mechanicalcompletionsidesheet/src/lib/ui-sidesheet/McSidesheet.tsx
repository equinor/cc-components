import { Tabs } from '@equinor/eds-core-react';
import { useState } from 'react';
import { createWidget } from '@equinor/workspace-sidesheet';
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
  WorkorderTab,
} from '@cc-components/shared/sidesheet';
import { McPackage } from '@cc-components/mechanicalcompletionshared';
import { DetailsTab } from './DetailsTab';
import { useMc, useNcr, usePunch } from '../utils-sidesheet';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { proCoSysUrls, statusColorMap } from '@cc-components/shared/mapping';
import { StatusCircle, StyledItemLink } from '@cc-components/shared/common';
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
    error: workOrderError,
    isFetching: isFetchingWorkOrders,
  } = useMc(props.id);
  const {
    data: punchItems,
    isFetching: isFetchingPunchItems,
    error: punchError,
  } = usePunch(props.id);
  const {
    data: ncr,
    isFetching: isFetchingNcr,
    error: ncrError,
  } = useNcr(props.item?.mechanicalCompletionPackageUrlId);

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
            <StyledItemLink
              href={proCoSysUrls.getMcUrl(
                props.item?.mechanicalCompletionPackageUrlId ?? ''
              )}
              target="_blank"
            >
              {props.item?.mechanicalCompletionPackageNo ?? 'N/A'}
            </StyledItemLink>
          }
        />
        <BannerItem
          title="Comm pkg"
          value={
            <StyledItemLink
              href={proCoSysUrls.getCommPkgUrl(
                props.item?.commissioningPackageUrlId ?? ''
              )}
              target="_blank"
            >
              {props.item?.commissioningPackageNo}
            </StyledItemLink>
          }
        />
        <BannerItem
          title="MC status"
          value={
            <StatusCircle
              content={props.item?.mechanicalCompletionStatus ?? 'N/A'}
              statusColor={
                props.item?.mechanicalCompletionStatus
                  ? statusColorMap[props.item?.mechanicalCompletionStatus]
                  : 'transparent'
              }
            />
          }
        />
        <BannerItem
          title="Comm status"
          value={
            <StatusCircle
              content={props.item?.commissioningPackageStatus ?? 'N/A'}
              statusColor={
                props.item?.commissioningPackageStatus
                  ? statusColorMap[props.item?.commissioningPackageStatus]
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
              error={workOrderError instanceof Error ? workOrderError : null}
              isFetching={isFetchingWorkOrders}
              workorders={workOrders}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <PunchTab
              error={punchError instanceof Error ? punchError : null}
              isFetching={isFetchingPunchItems}
              punches={punchItems}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <NcrTab
              error={ncrError instanceof Error ? ncrError : null}
              isFetching={isFetchingNcr}
              ncrs={ncr}
            />
          </Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
});

export default McSideSheet.render;
