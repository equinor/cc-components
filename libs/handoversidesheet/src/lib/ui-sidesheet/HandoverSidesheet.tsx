import { HandoverPackage } from '@cc-components/handovershared';
import { StatusCircle } from '@cc-components/shared/common';
import { statusColorMap } from '@cc-components/shared';
import { Icon, Switch } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import {
  BannerItem,
  CustomStyledPanels,
  CustomStyledTabs,
  SidesheetHeader,
  StyledBanner,
  StyledPanel,
  StyledSideSheetContainer,
  TabTitle,
} from '@cc-components/sharedcomponents';

import {
  McTab,
  NcrTab,
  PunchTab,
  QueryTab,
  SwcrTab,
  UnsignedActionTab,
  UnsignedTaskTab,
  UnsignedChecklistTab,
  WorkorderBase,
  WorkorderTab,
  useContextId,
} from '@cc-components/shared';

import styled from 'styled-components';
import { SidesheetSkeleton } from '@cc-components/sharedcomponents';
import { Tabs } from '@equinor/eds-core-react';
import { error_outlined } from '@equinor/eds-icons';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { useHandoverResource } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTabs';
import { StyledTabListWrapper, StyledTabsList } from './sidesheet.styles';

type HandoverProps = {
  id: string;
  item?: HandoverPackage;
  close: VoidFunction;
};

export const HandoverSidesheet = ({ id, close: closeSidesheet, item }: HandoverProps) => {
  const client = useHttpClient('cc-app');
  const contextId = useContextId();
  const { isLoading, data, error } = useQuery({
    queryKey: ['handover', id],
    queryFn: async () => {
      const res = await client.fetch(`/api/contexts/${contextId}/handover/${id}`);
      if (!res.ok) {
        throw new Error(`Failed to get handover with id ${id}`);
      }
      return res.json() as Promise<HandoverPackage>;
    },
    refetchOnWindowFocus: false,
    initialData: item ?? undefined,
  });

  if (isLoading) {
    return <SidesheetSkeleton close={() => closeSidesheet()} />;
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

  return <HandoverSidesheetComponent id={id} item={data} close={closeSidesheet} />;
};

Icon.add({ error_outlined });

const HandoverSidesheetComponent = (props: Required<HandoverProps>) => {
  const [activeTab, setActiveTab] = useState(0);
  const [ShowOnlyOutstandingPunch, setShowOnlyOutstandingPunch] = useState(true);
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
    data: unsignedChecklists,
    dataIsFetching: isDataFetchingUnsignedChecklists,
    error: unsignedChecklistsError,
  } = useHandoverResource(props.id, 'unsigned-checklists');

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

  const {
    data: ncrPackages,
    dataIsFetching: isDataFetchingNcr,
    error: ncrError,
  } = useHandoverResource(props.item.commissioningPackageNo, 'ncr');

  const filteredPunches = useMemo(() => {
    if (ShowOnlyOutstandingPunch) {
      return punchPackages?.filter((punch) => punch.isOpen === true);
    }
    return punchPackages;
  }, [punchPackages, ShowOnlyOutstandingPunch]);

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={props?.item?.commissioningPackageNo || ''}
        url={props?.item?.commissioningPackageUrl || ''}
        description={props?.item?.description || ''}
        applicationTitle={'Handover'}
        onClose={props.close}
      />
      <StyledBanner>
        <BannerItem
          title="Compkg status"
          value={
            <StatusCircle
              content={props?.item?.status || 'N/A'}
              statusColor={
                props?.item?.commissioningPackageStatus
                  ? statusColorMap[props.item.status]
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
              infoMessage={
                props.item.hasNonCountingScope
                  ? `Commissioning Package has non-counting scope. Worst checklist status is "${props.item.worstChecklistStatus}"`
                  : undefined
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
      <CustomStyledTabs activeTab={activeTab} onChange={handleChange}>
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
              Unsigned Checklists

              <TabTitle
                data={unsignedChecklists}
                isLoading={isDataFetchingUnsignedChecklists}
              />
            </Tabs.Tab>
            <Tabs.Tab>
              Punch <TabTitle data={filteredPunches} isLoading={isDataFetchingPunch} />{' '}
            </Tabs.Tab>
            <Tabs.Tab>
              SWCR <TabTitle data={swcrPackages} isLoading={isDataFetchingSwcr} />
            </Tabs.Tab>

            <Tabs.Tab>
              Query <TabTitle data={queryPackages} isLoading={isDataFetchingQuery} />{' '}
            </Tabs.Tab>

            <Tabs.Tab>
              NCR <TabTitle data={ncrPackages} isLoading={isDataFetchingNcr} />{' '}
            </Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>

        <CustomStyledPanels>
          <StyledPanel>
            <DetailsTab commpkg={props.item as HandoverPackage} />
          </StyledPanel>
          <StyledPanel>
            <McTab mc={mcPackages} isFetching={isDataFetchingMc} error={mcError} />
          </StyledPanel>
          <StyledPanel>
            <WorkorderTab
              workorders={workOrderPackages}
              isFetching={isDataFetchingWorkOrder}
              error={woError}
            />
          </StyledPanel>
          <StyledPanel>
            <UnsignedTaskTab
              unsignedTasks={unsignedTasks}
              isFetching={isDataFetchingUnsignedTasks}
              error={unsignedTasksError}
            />
          </StyledPanel>
          <StyledPanel>
            <UnsignedActionTab
              unsignedActions={unsignedActions}
              isFetching={isDataFetchingUnsignedActions}
              error={unsignedActionsError}
            />
          </StyledPanel>
          <StyledPanel>
            <UnsignedChecklistTab
              unsignedChecklists={unsignedChecklists}
              isFetching={isDataFetchingUnsignedChecklists}
              error={unsignedChecklistsError}
            />
          </StyledPanel>
          <StyledPanel>
            <Switch
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setShowOnlyOutstandingPunch(e.target.checked);
              }}
              checked={ShowOnlyOutstandingPunch}
              label={`Show only outstanding`}
              style={{ paddingLeft: '1rem', paddingTop: '0.5rem' }}
            />
            <PunchTab
              punches={filteredPunches}
              isFetching={isDataFetchingPunch}
              error={punchError}
            />
          </StyledPanel>
          <StyledPanel>
            <SwcrTab
              swcrs={swcrPackages}
              isFetching={isDataFetchingSwcr}
              error={swcrError}
            />
          </StyledPanel>

          <StyledPanel>
            <QueryTab
              queries={queryPackages}
              isFetching={isDataFetchingQuery}
              error={queryError}
            />
          </StyledPanel>
          <StyledPanel>
            <NcrTab
              ncrs={ncrPackages}
              isFetching={isDataFetchingQuery}
              error={ncrError}
            />
          </StyledPanel>
        </CustomStyledPanels>
      </CustomStyledTabs>
    </StyledSideSheetContainer>
  );
};

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
