import { Tabs } from '@equinor/eds-core-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  LinkCell,
  MaterialTab,
  MccrTab,
  NotificationTab,
  PackageStatus,
  StatusCircle,
  colorMap,
  hasProperty,
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
  StyledPanel,
  StyledSideSheetContainer,
  StyledTabListWrapper,
  StyledTabsList,
  TabTitle,
} from '@cc-components/sharedcomponents';
import {
  WorkOrder,
  getMatStatusColorByStatus,
  getMccrStatusColorByStatus,
} from '@cc-components/workordershared';
import { ModelViewerTab, TagOverlay } from '@cc-components/modelviewer';
import { useMaterial, useMccr } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTab';
import { useGetEchoConfig } from '../utils-sidesheet/useGetEchoConfig';
import { useNotifications } from '../utils-sidesheet/useNotifications';

const viewerOptions = {
  statusResolver: (status: string) => {
    return hasProperty(colorMap, status) ? colorMap[status as PackageStatus] : '#009922';
  },
  defaultCroppingDistance: 3,
};

export const WorkorderSidesheet = (props: {
  id: string;
  item?: WorkOrder | undefined;
  close: VoidFunction;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const { mccr, isFetching: isFetchingMccr, error: mccrError } = useMccr(props.id);

  const {
    material,
    isFetching: isFetchingMaterial,
    error: materialError,
  } = useMaterial(props.id);

  const {
    data: notifications,
    isFetching: isFetchingNotifications,
    error: notificationsError,
  } = useNotifications(props.id);

  const {
    data: modelConfig,
    isFetching: isFetchingModelConfig,
    error: modelConfigError,
  } = useGetEchoConfig(props.id);

  const client = useHttpClient();
  const contextId = useContextId();

  const {
    data: wo,
    error,
    isLoading: isLoadingSidesheet,
  } = useQuery<WorkOrder>({
    queryKey: ['workorder', props.id],
    queryFn: async () => {
      const res = await client.fetch(
        `/api/contexts/${contextId}/work-orders/${props.id}`
      );
      if (!res.ok) {
        throw res;
      }
      return res.json();
    },
    throwOnError: false,
    initialData: props.item ?? undefined,
  });

  const tagsOverlay = modelConfig?.tags?.map((tag) => ({
    tagNo: tag.tagNo,
    description: tag.description,
    status: tag.status,
    icon: <h3>{tag.status}</h3>,
  })) as TagOverlay[];

  if (isLoadingSidesheet) {
    return <SidesheetSkeleton close={props.close} />;
  }

  if (!wo || error) {
    return <div>Failed to get Workorder with id: {props.id}</div>;
  }
  const handleChange = (index: number) => {
    setActiveTab(index);
  };
  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={wo.description ?? ''}
        applicationTitle={'Workorder'}
        onClose={props.close}
      />
      <StyledBanner>
        <BannerItem
          title="WO"
          value={
            wo.workorderUrl ? (
              <LinkCell url={wo.workorderUrl} urlText={wo.workOrderNumber} />
            ) : (
              wo.workOrderNumber
            )
          }
        />
        <BannerItem
          title="Material status"
          value={
            wo?.materialStatus ? (
              <StatusCircle
                statusColor={
                  wo?.materialStatus
                    ? getMatStatusColorByStatus(wo.materialStatus)
                    : 'transparent'
                }
                content={wo?.materialStatus || 'N/A'}
              />
            ) : (
              'N/A'
            )
          }
        />
        <BannerItem
          title="MC status"
          value={
            wo?.mccrStatus ? (
              <StatusCircle
                statusColor={
                  wo?.mccrStatus
                    ? getMccrStatusColorByStatus(wo.mccrStatus)
                    : 'transparent'
                }
                content={wo?.mccrStatus || 'N/A'}
              />
            ) : (
              'N/A'
            )
          }
        />
      </StyledBanner>
      <CustomStyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList>
            <Tabs.Tab>Details</Tabs.Tab>
            <Tabs.Tab>
              MCCR <TabTitle data={mccr} isLoading={isFetchingMccr} />
            </Tabs.Tab>
            <Tabs.Tab>
              Material <TabTitle data={material} isLoading={isFetchingMaterial} />
            </Tabs.Tab>
            <Tabs.Tab>
              Notifications{' '}
              <TabTitle data={notifications} isLoading={isFetchingNotifications} />
            </Tabs.Tab>
            <Tabs.Tab>
              3D <TabTitle data={modelConfig?.tags} isLoading={isFetchingModelConfig} />
            </Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>

        <CustomStyledPanels>
          <StyledPanel>
            <DetailsTab workOrder={wo} />
          </StyledPanel>
          <StyledPanel>
            <MccrTab
              mccr={mccr}
              isFetching={isFetchingMccr}
              error={mccrError as Error | null}
            />
          </StyledPanel>
          <StyledPanel>
            <MaterialTab
              material={material}
              isFetching={isFetchingMaterial}
              error={materialError as Error | null}
            />
          </StyledPanel>
          <StyledPanel>
            <NotificationTab
              notifications={notifications}
              isFetching={isFetchingNotifications}
              error={notificationsError}
            />
          </StyledPanel>
          <StyledPanel style={{ height: '100%' }}>
            <ModelViewerTab
              tagOverlay={tagsOverlay}
              options={viewerOptions}
              isFetching={isFetchingModelConfig}
              error={modelConfigError as Error | null}
              facilities={modelConfig?.facilities ?? []}
            />
          </StyledPanel>
        </CustomStyledPanels>
      </CustomStyledTabs>
    </StyledSideSheetContainer>
  );
};
