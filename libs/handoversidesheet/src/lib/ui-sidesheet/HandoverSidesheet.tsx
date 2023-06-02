import { HandoverPackage } from '@cc-components/handovershared';
import { StatusCircle } from '@cc-components/shared/common';
import { statusColorMap } from '@cc-components/shared/mapping';
import {
  BannerItem,
  McTab,
  NcrTab,
  PunchTab,
  QueryTab,
  SidesheetHeader,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
  SwcrTab,
  TabTitle,
  UnsignedActionTab,
  UnsignedTaskTab,
  WorkorderTab,
} from '@cc-components/shared/sidesheet';

import { Tabs } from '@equinor/eds-core-react';
import { createWidget } from '@equinor/workspace-sidesheet';
import { useRef, useState } from 'react';
import { useHandoverResource } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTabs';
import { StyledTabListWrapper, StyledTabsList } from './sidesheet.styles';
import { WorkorderBase } from 'libs/shared/dist/src/packages/sidesheet/src/lib/sidesheet/tabs/workorder/types';
type HandoverProps = {
  id: string;
  item?: HandoverPackage;
  close: () => void;
};
export const HandoverSidesheet = createWidget<HandoverProps>(({ frame, props }) => {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const handleChange = (index: number) => {
    setActiveTab(index);
    ref && ref.current && ref.current.scrollTo({ left: index ** index });
  };

  const {
    data: mcPackages,
    dataIsFetching: isDataFetchingMc,
    error: mcError,
  } = useHandoverResource(props.id, 'mcpkg');

  const { data: detailsData, dataIsFetching: isDataFetchingDetails } =
    useHandoverResource(props.id, 'details');

  const {
    data: ncrPackages,
    dataIsFetching: isDataFetchingNcr,
    error: ncrError,
  } = useHandoverResource(props.id, 'ncr');

  const {
    data: workOrderPackages,
    dataIsFetching: isDataFetchingWorkOrder,
    error: woError,
  } = useHandoverResource(props.id, 'work-orders');

  const {
    data: unsignedTasks,
    dataIsFetching: isDataFetchingUnsignedTasks,
    error: unsignedTasksError,
  } = useHandoverResource(props.id, 'unsigned-tasks');

  const {
    data: unsignedActions,
    dataIsFetching: isDataFetchingUnsignedActions,
    error: unsignedActionsError,
  } = useHandoverResource(props.id, 'unsigned-actions');

  const {
    data: punchPackages,
    dataIsFetching: isDataFetchingPunch,
    error: punchError,
  } = useHandoverResource(props.id, 'punch');

  const {
    data: swcrPackages,
    dataIsFetching: isDataFetchingSwcr,
    error: swcrError,
  } = useHandoverResource(props.id, 'swcr');

  const {
    data: queryPackages,
    dataIsFetching: isDataFetchingQuery,
    error: queryError,
  } = useHandoverResource(props.id, 'query');

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={props?.item?.commpkgNo || ''}
        applicationTitle={'Handover'}
        onClose={props.close}
      />
      <StyledBanner>
        <BannerItem
          title="Compkg status"
          value={
            <StatusCircle
              content={props?.item?.commpkgStatus || 'N/A'}
              statusColor={
                props?.item?.commpkgStatus
                  ? statusColorMap[props.item.commpkgStatus]
                  : 'transparent'
              }
            />
          }
        />
        <BannerItem
          title="MC status"
          value={
            <StatusCircle
              content={props?.item?.mcStatus || 'N/A'}
              statusColor={
                props?.item?.mcStatus
                  ? statusColorMap[props.item.mcStatus]
                  : 'transparent'
              }
            />
          }
        />
        <BannerItem
          title="Commpkg"
          value={
            props.item?.commpkgNo ? props.item.commpkgNo : 'N/A'
            // <StyledItemLink
            //   target="_blank"
            //   href={proCoSysUrls.getCommPkgUrl(props?.item?.id || '')}
            // >
            //   {props?.item?.commpkgNo}
            // </StyledItemLink>
          }
        />
      </StyledBanner>
      <StyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList ref={ref}>
            <Tabs.Tab>Details </Tabs.Tab>
            <Tabs.Tab>
              McPackages <TabTitle data={mcPackages} isLoading={isDataFetchingMc} />{' '}
            </Tabs.Tab>
            <Tabs.Tab>
              Work Orders{' '}
              <TabTitle data={workOrderPackages} isLoading={isDataFetchingWorkOrder} />{' '}
            </Tabs.Tab>
            <Tabs.Tab>
              Unsigned Tasks{' '}
              <TabTitle data={unsignedTasks} isLoading={isDataFetchingUnsignedTasks} />{' '}
            </Tabs.Tab>
            <Tabs.Tab>
              Unsigned Actions{' '}
              <TabTitle
                data={unsignedActions}
                isLoading={isDataFetchingUnsignedActions}
              />
            </Tabs.Tab>
            <Tabs.Tab>
              Punch <TabTitle data={punchPackages} isLoading={isDataFetchingPunch} />{' '}
            </Tabs.Tab>
            <Tabs.Tab>
              SWCR <TabTitle data={swcrPackages} isLoading={isDataFetchingSwcr} />
            </Tabs.Tab>
            <Tabs.Tab>
              NCr <TabTitle data={ncrPackages} isLoading={isDataFetchingNcr} />
            </Tabs.Tab>
            <Tabs.Tab>
              Query <TabTitle data={queryPackages} isLoading={isDataFetchingQuery} />{' '}
            </Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>

        <StyledPanels>
          <Tabs.Panel>
            <DetailsTab
              commpkg={props.item as HandoverPackage}
              dataIsFetching={isDataFetchingDetails}
              nextToSign={detailsData}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <McTab mc={mcPackages} isFetching={isDataFetchingMc} error={mcError} />
          </Tabs.Panel>
          <Tabs.Panel>
            <WorkorderTab
              workorders={(workOrderPackages ?? []).map(
                (workorder): WorkorderBase => ({
                  ...workorder,
                  workOrderNo: workorder.workOrderNumber,
                  actualCompletionDate: '',
                  discipline: '',
                  estimatedManHours: null,
                  jobStatus: '',
                  remainingManHours: null,
                  title: workorder.description,
                  workOrderId: workorder.commpkgId,
                  projectProgress: null,
                })
              )}
              isFetching={isDataFetchingWorkOrder}
              error={woError}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <UnsignedTaskTab
              unsignedTasks={unsignedTasks}
              isFetching={isDataFetchingUnsignedTasks}
              error={unsignedTasksError}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <UnsignedActionTab
              unsignedActions={unsignedActions}
              isFetching={isDataFetchingUnsignedActions}
              error={unsignedActionsError}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <PunchTab
              punches={punchPackages}
              isFetching={isDataFetchingPunch}
              error={punchError}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <SwcrTab
              swcrs={swcrPackages}
              isFetching={isDataFetchingSwcr}
              error={swcrError}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <NcrTab ncrs={ncrPackages} isFetching={isDataFetchingNcr} error={ncrError} />
          </Tabs.Panel>
          <Tabs.Panel>
            <QueryTab
              queries={queryPackages}
              isFetching={isDataFetchingQuery}
              error={queryError}
            />
          </Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
});

export default HandoverSidesheet.render;
