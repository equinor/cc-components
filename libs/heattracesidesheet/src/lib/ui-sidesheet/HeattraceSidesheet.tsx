import { HeatTrace } from '@cc-components/heattraceshared';
import { useResizeContext } from '@equinor/workspace-fusion';
import { useRef, useState } from 'react';
import { useGetWorkorders } from '../utils-sidesheet';
import { WorkorderTab } from '@cc-components/shared/sidesheet';
import {
  BaseStatus,
  LinkCell,
  StatusCircle,
  domainNames,
  hasProperty,
  statusColorMap,
  useContextId,
  useHttpClient,
} from '@cc-components/shared';
import {
  BannerItem,
  CustomStyledPanels,
  CustomStyledTabs,
  SidesheetHeader,
  SidesheetSkeleton,
  StyledBanner,
  StyledSideSheetContainer,
  StyledTabListWrapper,
  StyledTabsList,
  TabTitle,
} from '@cc-components/sharedcomponents';
import { ChecklistTab } from './ChecklistTab';
import { useGetHeatTraceChecklists } from '../utils-sidesheet/useGetChecklists';
import { useQuery } from '@tanstack/react-query';
import { CircuitDiagramTab } from './CircuitDiagramTab';
import { ModelViewerTab } from '@cc-components/modelviewer';
import { useGetEchoConfig } from '../utils-sidesheet/useGetEchoConfig';
import { Icon, Tabs } from '@equinor/eds-core-react';
import { useGetEleNetwork } from '../utils-sidesheet/useGetEleNetwork';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

const viewerOptions = {
  statusResolver: (status: string) => {
    return hasProperty(statusColorMap, status) ? statusColorMap[status] : '#009922';
  },
  defaultCroppingDistance: 3,
};

type HeatTraceProps = {
  id: string;
  item?: HeatTrace;
  close: () => void;
};

const HeattraceSidesheetComponent = ({ id, item, close }: HeatTraceProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const handleChange = (index: number) => {
    setActiveTab(index);
    ref && ref.current && ref.current.scrollTo({ left: index ** index });
  };

  const { width: sidesheetWidth, setWidth: setSidesheetWidth } = useResizeContext();
  const reszied = useRef({ hasResized: false, id: id });
  if (reszied.current.id !== id) {
    reszied.current = { hasResized: false, id: id };
    setSidesheetWidth(700);
  }

  const { eleNetwork } = useGetEleNetwork(item);

  const { dataWorkorders, errorWorkorders, isLoadingWorkorders } = useGetWorkorders(id);

  const { dataChecklists, errorChecklists, isLoadingChecklists } =
    useGetHeatTraceChecklists(id);

  const { dataEcho, errorEcho, isFetchingEcho, tagsOverlayEcho } = useGetEchoConfig(id);

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={item?.heatTraceCableNo ?? ''}
        url={item?.heatTraceCableUrl ?? ''}
        description={item?.heatTraceCableDescription || ''}
        onClose={close}
        applicationTitle="Heat Trace"
      />
      <StyledBanner>
        <BannerItem
          title={domainNames.checklistStatus}
          value={
            <StatusCircle
              content={item?.formStatus || 'N/A'}
              statusColor={
                item?.formStatus
                  ? statusColorMap[item.formStatus as BaseStatus]
                  : 'transparent'
              }
            />
          }
        />
        <BannerItem
          title={domainNames.commPkg}
          value={
            item?.commissioningPackageNo ? (
              <LinkCell
                url={item.commissioningPackageUrl ?? ''}
                urlText={item.commissioningPackageNo}
              />
            ) : (
              'N/A'
            )
          }
        ></BannerItem>
        <BannerItem
          title={domainNames.mcPkg}
          value={
            item?.mechanicalCompletionPackageNo ? (
              <LinkCell
                url={item.mechanicalCompletionUrl ?? ''}
                urlText={item.mechanicalCompletionPackageNo}
              />
            ) : (
              'N/A'
            )
          }
        />
        <BannerItem title={domainNames.commPriority1} value={item?.priority1 ?? 'N/A'} />
      </StyledBanner>
      <CustomStyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList ref={ref}>
            <Tabs.Tab>Circuit diagram</Tabs.Tab>
            <Tabs.Tab>
              Work orders
              <TabTitle data={dataWorkorders} isLoading={isLoadingWorkorders} />
            </Tabs.Tab>
            <Tabs.Tab>
              Checklists
              <TabTitle data={dataChecklists} isLoading={isLoadingChecklists} />
            </Tabs.Tab>
            <Tabs.Tab>
              3D <TabTitle data={tagsOverlayEcho} isLoading={isFetchingEcho} />
            </Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>

        <CustomStyledPanels>
          <Tabs.Panel>
            <CircuitDiagramTab
              elenetwork={eleNetwork}
              itemNo={item?.heatTraceCableNo ?? ''}
              onCircuitDiagramReady={(element) => {
                if (reszied.current.hasResized) return;
                const newWidth = element.scrollWidth;
                if (sidesheetWidth !== 700) return;
                setSidesheetWidth(newWidth + 50);
                reszied.current = { hasResized: true, id: id };
              }}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <WorkorderTab
              error={errorWorkorders}
              isFetching={isLoadingWorkorders}
              workorders={dataWorkorders}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <ChecklistTab
              error={errorChecklists}
              isFetching={isLoadingChecklists}
              checklists={dataChecklists}
            />
          </Tabs.Panel>
          <Tabs.Panel style={{ height: '100%' }}>
            <ModelViewerTab
              tagOverlay={tagsOverlayEcho}
              options={viewerOptions}
              isFetching={isFetchingEcho}
              error={errorEcho as Error | null}
              facilities={dataEcho?.facilities ?? []}
            />
          </Tabs.Panel>
        </CustomStyledPanels>
      </CustomStyledTabs>
    </StyledSideSheetContainer>
  );
};

export function HeattraceSidesheet({ id, item, close }: HeatTraceProps) {
  const client = useHttpClient();
  const contextId = useContextId();

  const {
    data: heatTrace,
    error,
    isLoading: isLoadingSidesheet,
  } = useQuery<HeatTrace>({
    queryKey: ['heat-trace', id],
    queryFn: async () => {
      const res = await client.fetch(`/api/contexts/${contextId}/heat-trace/${id}`);
      if (!res.ok) throw res;
      return res.json();
    },
    initialData: item ?? undefined,
    throwOnError: false,
  });

  if (isLoadingSidesheet) {
    return <SidesheetSkeleton close={close} />;
  }

  if (!heatTrace || error) {
    return (
      <ErrorContainer>
        <ErrorWrapper>
          <Icon
            name="error_outlined"
            size={48}
            color={tokens.colors.interactive.primary__resting.hsla}
          />
          <ErrorMessage>{`Failed to load details for ${id}`}</ErrorMessage>
        </ErrorWrapper>
      </ErrorContainer>
    );
  }

  return <HeattraceSidesheetComponent id={id} item={heatTrace} close={close} />;
}

const ErrorContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
`;

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
