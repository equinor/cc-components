import { HandoverPackage } from '@cc-components/handovershared';
import { StatusCircle } from '@cc-components/shared/common';
import { statusColorMap } from '@cc-components/shared/mapping';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import {
  BannerItem,
  McTab,
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

import { useContextId } from '@cc-components/shared';
import { SidesheetSkeleton } from '@cc-components/sharedcomponents';
import { Tabs } from '@equinor/eds-core-react';
import { error_outlined } from '@equinor/eds-icons';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { createWidget } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useHandoverResource } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTabs';
import { StyledTabListWrapper, StyledTabsList } from './sidesheet.styles';

type HandoverProps = {
  id: string;
  item?: HandoverPackage;
  closeSidesheet: VoidFunction;
};
export const HandoverSidesheet = createWidget<HandoverPackage>(({ props }) => (
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

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={props?.item?.commissioningPackageNo || ''}
        description={props?.item?.description || ''}
        applicationTitle={'Handover'}
        onClose={props.closeSidesheet}
      />
      <StyledBanner>
        <BannerItem
          title="Compkg status"
          value={
            <StatusCircle
              content={props?.item?.dynamicCommissioningStatus || 'N/A'}
              statusColor={
                props?.item?.commissioningPackageStatus
                  ? statusColorMap[props.item.dynamicCommissioningStatus]
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

            <Tabs.Tab>
              Query <TabTitle data={queryPackages} isLoading={isDataFetchingQuery} />{' '}
            </Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>

        <StyledPanels>
          <Tabs.Panel>
            <DetailsTab commpkg={props.item as HandoverPackage} />
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
                  workOrderUrl: workorder.commpkgId,
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

function EnsureHandover({ id, closeSidesheet, item }: HandoverProps) {
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
    return <SidesheetSkeleton close={close} />;
  }

  if (error || !data) {
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
      closeSidesheet={closeSidesheet}
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
