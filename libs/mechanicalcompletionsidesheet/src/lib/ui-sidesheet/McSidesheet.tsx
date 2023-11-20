import { McPackage } from '@cc-components/mechanicalcompletionshared';
import { StatusCircle } from '@cc-components/shared/common';
import { statusColorMap } from '@cc-components/shared/mapping';
import {
  NcrTab,
  PunchTab,
  WorkorderBase,
  WorkorderTab,
} from '@cc-components/shared/sidesheet';
import {
  SidesheetHeader,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
  TabTitle,
  BannerItem,
  SidesheetSkeleton,
  StyledTabListWrapper,
} from '@cc-components/sharedcomponents';
import { Icon, Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { createWidget, useContextId } from '@cc-components/shared';
import { useRef, useState } from 'react';
import { useMcResource } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTab';
import { error_outlined } from '@equinor/eds-icons';

type McProps = {
  id: string;
  item?: McPackage;
  closeSidesheet: VoidFunction;
};
export const McSideSheet = createWidget<McPackage>(({ props }) => (
  <EnsureMcPkg {...props} />
));

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

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={props.item.mechanicalCompletionPackageNo || ''}
        description={props?.item?.description || ''}
        url={props.item.mechanicalCompletionPackageUrl || ''}
        applicationTitle={'Mechanical completion'}
        onClose={props.closeSidesheet}
      />
      <StyledBanner>
        <BannerItem
          title="MC pkg"
          value={
            props.item?.mechanicalCompletionPackageNo ?? 'N/A'
            // <StyledItemLink href={proCoSysUrls.getMcUrl(props.id)} target="_blank">
            //   {props.item?.mcPkgNumber ?? 'N/A'}
            // </StyledItemLink>
          }
        />
        <BannerItem
          title="Comm pkg"
          value={
            props.item?.commissioningPackageNo ?? 'N/A'
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
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
};

export default McSideSheet.render;

import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

function EnsureMcPkg({ id, closeSidesheet, item }: McProps) {
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

  return (
    <McSideSheetComponent
      id={id}
      item={data}
      closeSidesheet={closeSidesheet}
    ></McSideSheetComponent>
  );
}

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
