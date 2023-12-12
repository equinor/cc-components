import { McPackage } from '@cc-components/mechanicalcompletionshared';
import { useContextId } from '@cc-components/shared';
import { StatusCircle, StyledItemLink } from '@cc-components/shared/common';
import { statusColorMap } from '@cc-components/shared/mapping';
import { MccrTab, NcrTab, PunchTab, WorkorderTab } from '@cc-components/shared/sidesheet';
import {
  BannerItem,
  SidesheetHeader,
  SidesheetSkeleton,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabListWrapper,
  StyledTabs,
  TabTitle,
} from '@cc-components/sharedcomponents';
import { Icon, Tabs } from '@equinor/eds-core-react';
import { error_outlined } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useRef, useState } from 'react';
import { useMcResource } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTab';

import styled from 'styled-components';

type McProps = {
  id: string;
  item?: McPackage;
  close: VoidFunction;
};
export const McSideSheet = ({ id, close: closeSidesheet, item }: McProps) => {
  return <EnsureMcPkg id={id} item={item} close={closeSidesheet} />;
};

Icon.add({ error_outlined });

const McSideSheetComponent = (props: Required<McProps>) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const handleChange = (index: number) => {
    setActiveTab(index);
    ref && ref.current && ref.current.scrollTo({ left: index ** index });
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

  const {
    data: mccrs,
    isFetching: isFetchingMccr,
    error: mccrError,
  } = useMcResource(props.id, 'mccr');

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={props.item.mechanicalCompletionPackageNo || ''}
        description={props?.item?.description || ''}
        url={props.item.mechanicalCompletionPackageUrl || ''}
        applicationTitle={'Mechanical completion'}
        onClose={props.close}
      />
      <StyledBanner>
        <BannerItem
          title="MC pkg"
          value={
            <StyledItemLink
              href={props.item?.mechanicalCompletionPackageUrl}
              target="_blank"
            >
              {props.item?.mechanicalCompletionPackageNo ?? 'N/A'}
            </StyledItemLink>
          }
        />
        <BannerItem
          title="Comm pkg"
          value={
            <StyledItemLink href={props.item?.commissioningPackageUrl} target="_blank">
              {props.item?.commissioningPackageNo ?? 'N/A'}
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
              content={props.item?.commpkgStatus ?? 'N/A'}
              statusColor={
                props.item?.commpkgStatus
                  ? statusColorMap[props.item?.commpkgStatus]
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
            <Tabs.Tab>
              MCCR <TabTitle data={mccrs} isLoading={isFetchingMccr} />
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
              workorders={workOrders}
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
          <Tabs.Panel>
            <MccrTab
              error={mccrError}
              isFetching={isFetchingMccr}
              mccr={(mccrs ?? []).map(
                (mccr): MccrBase => ({
                  ...mccr,
                  commissioningPackageId: mccr.commissioningPackageId,
                  commissioningPackageUrl: mccr.commissioningPackageUrl,
                  commissioningPackageUrlId: mccr.commissioningPackageUrlId,
                  commpkgId: mccr.commissioningPackageId,
                  commpkgNumber: mccr.commissioningPackageNo,
                  description: mccr.description,
                  facility: mccr.facility,
                  mcPkgId: mccr.mechanicalCompletionPackageId,
                  mccrId: mccr.checklistID,
                  mccrResponsible: mccr.responsible,
                  mccrStatus: mccr.status,
                  mccrType: mccr.formularType,
                  mccrUrlId: mccr.checklistUrlId,
                  mcpkgNumber: mccr.mechanicalCompletionPackageNo,
                  mechanicalCompletionPackageUrl: mccr.mechanicalCompletionPackageUrl,
                  mechanicalCompletionPackageUrlId: mccr.mechanicalCompletionUrlId,
                  project: mccr.project,
                  tagId: mccr.tagId,
                  tagNumber: mccr.tagNo,
                  tagUrl: mccr.tagUrl,
                  tagUrlId: mccr.tagUrlId,
                  workOrderId: null,
                  workOrderUrl: null,
                  workOrderUrlId: null,
                })
              )}
            />
          </Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
};

import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useQuery } from '@tanstack/react-query';
import { MccrBase } from 'libs/shared/dist/src/packages/sidesheet/src/lib/sidesheet/tabs/mccr/types';

const EnsureMcPkg = ({ id, close, item }: McProps) => {
  const client = useHttpClient('cc-app');
  const contextId = useContextId();
  const { isLoading, data, error } = useQuery(
    ['mcpkg', id],
    async () => {
      const res = await client.fetch(
        `/api/contexts/${contextId}/mechanical-completion/${id}`
      );
      if (!res.ok) {
        throw new Error(`Failed to get mcpkg with id ${id}`);
      }
      return res.json() as Promise<McPackage>;
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

  return <McSideSheetComponent id={id} item={data} close={close}></McSideSheetComponent>;
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
