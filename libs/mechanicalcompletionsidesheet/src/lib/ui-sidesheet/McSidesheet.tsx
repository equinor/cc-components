import { McPackage } from '@cc-components/mechanicalcompletionshared';
import { hasProperty, useContextId } from '@cc-components/shared';
import { StatusCircle, StyledItemLink } from '@cc-components/shared/common';
import { statusColorMap } from '@cc-components/shared/mapping';
import { MccrTab, NcrTab, PunchTab, WorkorderTab } from '@cc-components/shared/sidesheet';
import {
  BannerItem,
  CustomStyledPanels,
  CustomStyledTabs,
  SidesheetHeader,
  SidesheetSkeleton,
  StyledBanner,
  StyledSideSheetContainer,
  StyledTabListWrapper,
  TabTitle,
} from '@cc-components/sharedcomponents';

import { ModelViewerTab } from '@cc-components/modelviewer';

import { Icon, Switch, Tabs } from '@equinor/eds-core-react';
import { error_outlined } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { useMcResource } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTab';

import styled from 'styled-components';

const viewerOptions = {
  statusResolver: (status: string) => {
    return hasProperty(colorMap, status) ? colorMap[status] : '#009922';
  },
  defaultCroppingDistance: 3,
};

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
  const [showOnlyOutstandingPunch, setShowOnlyOutstandingPunch] = useState(true);
  const [showOnlyOutstandingWo, setShowOnlyOutstandingWo] = useState(true);
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
  } = useMcResource(props.item.commissioningPackageNo, 'ncr');

  const {
    data: mccrs,
    isFetching: isFetchingMccr,
    error: mccrError,
  } = useMcResource(props.id, 'mccr');

  const {
    data: modelConfig,
    tagsOverlay,
    isFetching: isFetchingModelConfig,
    error: modelConfigError,
  } = useGetEchoConfig(props.id);

  const filteredPunches = useMemo(() => {
    if (showOnlyOutstandingPunch) {
      return punchItems?.filter((punch) => punch.status === 'Open');
    }
    return punchItems;
  }, [punchItems, showOnlyOutstandingPunch]);

  const filteredWos = showOnlyOutstandingWo
    ? workOrders?.filter((s) => s.projectProgress !== 100)
    : workOrders;

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
      <CustomStyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <Tabs.List>
            <Tabs.Tab>Details</Tabs.Tab>

            <Tabs.Tab>
              Workorders <TabTitle data={filteredWos} isLoading={isFetchingWorkOrders} />
            </Tabs.Tab>
            <Tabs.Tab>
              Punch <TabTitle data={filteredPunches} isLoading={isFetchingPunchItems} />
            </Tabs.Tab>
            <Tabs.Tab>
              NCR <TabTitle data={ncr} isLoading={isFetchingNcr} />
            </Tabs.Tab>
            <Tabs.Tab>
              MCCR <TabTitle data={mccrs} isLoading={isFetchingMccr} />
            </Tabs.Tab>
            <Tabs.Tab>
              3D <TabTitle data={tagsOverlay} isLoading={isFetchingModelConfig} />
            </Tabs.Tab>
          </Tabs.List>
        </StyledTabListWrapper>

        <CustomStyledPanels>
          <Tabs.Panel>
            <DetailsTab mcPackage={props?.item} />
          </Tabs.Panel>
          <Tabs.Panel>
            <Switch
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setShowOnlyOutstandingWo(e.target.checked);
              }}
              checked={showOnlyOutstandingWo}
              label="Show only outstanding"
              style={{ paddingLeft: '1rem', paddingTop: '0.5rem' }}
            />
            <WorkorderTab
              error={workOrderError}
              isFetching={isFetchingWorkOrders}
              workorders={filteredWos}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <Switch
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setShowOnlyOutstandingPunch(e.target.checked);
              }}
              checked={showOnlyOutstandingPunch}
              label={`Show only outstanding`}
              style={{ paddingLeft: '1rem', paddingTop: '0.5rem' }}
            />
            <PunchTab
              error={punchError}
              isFetching={isFetchingPunchItems}
              punches={filteredPunches}
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
                  mccrUrl: mccr.checklistUrl,
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
          <Tabs.Panel style={{ height: '100%' }}>
            <ModelViewerTab
              tagOverlay={tagsOverlay}
              options={viewerOptions}
              isFetching={isFetchingModelConfig}
              error={modelConfigError as Error | null}
              facilities={modelConfig?.facilities ?? []}
            />
          </Tabs.Panel>
        </CustomStyledPanels>
      </CustomStyledTabs>
    </StyledSideSheetContainer>
  );
};

import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useQuery } from '@tanstack/react-query';
import { MccrBase } from 'libs/shared/dist/src/packages/sidesheet/src/lib/sidesheet/tabs/mccr/types';
import { useGetEchoConfig } from '../utils-sidesheet/useGetEchoConfig';

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
