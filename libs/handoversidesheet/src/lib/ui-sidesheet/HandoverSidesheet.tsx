import { HandoverPackage } from '@cc-components/handovershared';
import { StatusCircle, StyledItemLink } from '@cc-components/shared/common';
import { proCoSysUrls, statusColorMap } from '@cc-components/shared/mapping';
import { tokens } from '@equinor/eds-tokens';
import { Icon } from '@equinor/eds-core-react';

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
  WorkorderBase,
  WorkorderTab,
} from '@cc-components/shared/sidesheet';

import { CircularProgress, Tabs } from '@equinor/eds-core-react';
import { createWidget } from '@equinor/workspace-sidesheet';
import { useRef, useState } from 'react';
import { useHandoverResource } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTabs';
import { StyledTabListWrapper, StyledTabsList } from './sidesheet.styles';
import { WorkorderBase } from 'libs/shared/dist/src/packages/sidesheet/src/lib/sidesheet/tabs/workorder/types';
import { useQuery } from '@tanstack/react-query';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useContextId } from '@cc-components/shared';
import { info_circle, error_outlined } from '@equinor/eds-icons';

type HandoverProps = {
  id: string;
  item?: HandoverPackage;
  close: () => void;
};
export const HandoverSidesheet = createWidget<HandoverProps>(({ frame, props }) => (
  <EnsureHandover {...props} />
));

Icon.add({ error_outlined });

const HandoverSidesheetComponent = (props: Required<HandoverProps>) => {
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

  // const { data: detailsData, dataIsFetching: isDataFetchingDetails } =
  //   useHandoverResource(props.id, 'details');

  // const {
  //   data: ncrPackages,
  //   dataIsFetching: isDataFetchingNcr,
  //   error: ncrError,
  // } = useHandoverResource(props.id, 'ncr');

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={props?.item?.commissioningPackageNo || ''}
        applicationTitle={'Handover'}
        onClose={props.close}
      />
      <StyledBanner>
        <BannerItem
          title="Compkg status"
          value={
            <StatusCircle
              content={props?.item?.commissioningPackageStatus || 'N/A'}
              statusColor={
                props?.item?.commissioningPackageStatus
                  ? statusColorMap[props.item.commissioningPackageStatus]
                  : 'transparent'
              }
            />
          }
        />
        <BannerItem
          title="MC status"
          value={
            <StatusCircle
              content={props?.item?.mechanicalCompletionStatus || 'N/A'}
              statusColor={
                props?.item?.mechanicalCompletionStatus
                  ? statusColorMap[props.item.mechanicalCompletionStatus]
                  : 'transparent'
              }
            />
          }
        />
        <BannerItem
          title="Commpkg"
          value={
            props.item?.commissioningPackageNo ? props.item.commissioningPackageNo : 'N/A'
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
              Work Orders
              <TabTitle
                data={workOrderPackages}
                isLoading={isDataFetchingWorkOrder}
              />{' '}
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
            {/* <Tabs.Tab>
              NCr <TabTitle data={ncrPackages} isLoading={isDataFetchingNcr} />
            </Tabs.Tab> */}
            <Tabs.Tab>
              Query <TabTitle data={queryPackages} isLoading={isDataFetchingQuery} />{' '}
            </Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>

        <StyledPanels>
          <Tabs.Panel>
            <DetailsTab
              commpkg={props.item as HandoverPackage}
              // dataIsFetching={isDataFetchingDetails}
              // nextToSign={detailsData}
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
                  workOrderNumber: workorder.workOrderNumber,
                  actualCompletionDate: workorder.actualCompletionDate,
                  plannedFinishDate: workorder.plannedFinishDate,
                  discipline: workorder.discipline,
                  estimatedHours: workorder.estimatedHours,
                  jobStatus: workorder.jobStatus,
                  remainingHours: workorder.remainingHours,
                  title: workorder.description,
                  workorderUrl: workorder.commpkgId,
                  projectProgress: workorder.projectProgress,
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
          {/* <Tabs.Panel>
            <NcrTab ncrs={ncrPackages} isFetching={isDataFetchingNcr} error={ncrError} />
          </Tabs.Panel> */}
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
};

export default HandoverSidesheet.render;

function EnsureHandover({ id, close, item }: HandoverProps) {
  const client = useHttpClient('cc-app');
  const contextId = useContextId();
  const { isLoading, data, error } = useQuery(
    ['handover', id],
    async () => {
      const res = await client.fetch(`/api/contexts/${contextId}/handover/${id}`);
      if (!res.ok) {
        throw new Error(`Failed to get handover with id ${id}`);
      }
      return res.json() as Promise<HandoverPackage>;
    },
    { refetchOnWindowFocus: false }
  );

  if (isLoading) {
    return (
      <div
        style={{ display: 'grid', placeItems: 'center', height: '100%', width: '100%' }}
      >
        <CircularProgress size={48} />
      </div>
    );
  }

  if (error || !data) {
    console.log(error)
    return (
      <div
        style={{ display: 'grid', placeItems: 'center', height: '100%', width: '100%' }}
      >
        <ErrorWrapper>
          <Icon
            name="error_outlined"
            size={48}
            color={tokens.colors.interactive.primary__resting.hsla}
          />
          <ErrorMessage>{`Failed to load details for ${id}`}</ErrorMessage>
        </ErrorWrapper>
      </div>
    );
  }

  return (
    <HandoverSidesheetComponent
      id={id}
      item={data}
      close={close}
    ></HandoverSidesheetComponent>
  );
}

import styled from 'styled-components';
const ErrorWrapper = styled.div`
  text-align: center;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const ErrorMessage = styled.h3`
  margin: 0;
`;
