import {
  BannerItem,
  LinkCell,
  MaterialTab,
  MccrTab,
  SidesheetHeader,
  StatusCircle,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
  TabTitle,
  useContextId,
  useHttpClient
} from '@cc-components/shared';
import { SidesheetSkeleton } from '@cc-components/sharedcomponents';
import {
  WorkOrder,
  getMatStatusColorByStatus,
  getMccrStatusColorByStatus,
} from '@cc-components/workordershared';
import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { createWidget } from '@equinor/workspace-sidesheet';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { useMaterial, useMccr } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTab';

export const StyledTabListWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  background-color: ${tokens.colors.ui.background__light.hex};
`;
export const StyledTabsList = styled(Tabs.List)`
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  scroll-behavior: smooth;
`;
type WorkorderProps = {
  id: string;
  item?: WorkOrder;
  closeSidesheet: () => void;
};
export const WorkorderSidesheet = createWidget<WorkorderProps>(({ frame, props }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { mccr, isFetching: isFetchingMccr, error: mccrError } = useMccr(props.id);

  const client = useHttpClient();
  const contextId = useContextId();
  const {
    data: wo,
    error,
    isLoading: isLoadingSidesheet,
  } = useQuery<WorkOrder>(
    ['workorder', props.id],
    async () => {
      const res = await client.fetch(
        `/api/contexts/${contextId}/work-orders/${props.id}`
      );
      if (!res.ok) {
        throw res;
      }
      return res.json();
    },
    {
      suspense: true,
      initialData: props.item,
    }
  );

  if (isLoadingSidesheet) {
    return <SidesheetSkeleton close={props.closeSidesheet} />;
  }

  if (!wo || error) {
    return <div>Failed to get Workorder with id: {props.id}</div>;
  }

  const {
    material,
    isFetching: isFetchingMaterial,
    error: materialError,
  } = useMaterial(props.id);

  const handleChange = (index: number) => {
    setActiveTab(index);
  };
  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={wo.description ?? ''}
        applicationTitle={'Workorder'}
        onClose={props.closeSidesheet}
      />
      <StyledBanner>
        <BannerItem
          title="WO"
          value={
            wo.workOrderUrl ? (
              <LinkCell url={wo.workOrderUrl} urlText={wo.workOrderNumber} />
            ) : (
              wo.workOrderNumber
            )
          }
        />
        <BannerItem
          title="Material status"
          value={
            props.item?.materialStatus ? (
              <StatusCircle
                statusColor={
                  props.item?.materialStatus
                    ? getMatStatusColorByStatus(props.item.materialStatus)
                    : 'transparent'
                }
                content={props.item?.materialStatus || 'N/A'}
              />
            ) : (
              'N/A'
            )
          }
        />
        <BannerItem
          title="MC status"
          value={
            props.item?.mccrStatus ? (
              <StatusCircle
                statusColor={
                  props.item?.mccrStatus
                    ? getMccrStatusColorByStatus(props.item.mccrStatus)
                    : 'transparent'
                }
                content={props.item?.mccrStatus || 'N/A'}
              />
            ) : (
              'N/A'
            )
          }
        />
      </StyledBanner>
      <StyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList>
            <Tabs.Tab>Details</Tabs.Tab>
            <Tabs.Tab>
              MCCR <TabTitle data={mccr} isLoading={isFetchingMccr} />
            </Tabs.Tab>
            <Tabs.Tab>
              Material <TabTitle data={material} isLoading={isFetchingMaterial} />
            </Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>

        <StyledPanels>
          <Tabs.Panel>
            <DetailsTab workOrder={wo} />
          </Tabs.Panel>
          <Tabs.Panel>
            <MccrTab
              mccr={mccr}
              isFetching={isFetchingMccr}
              error={mccrError as Error | null}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <MaterialTab
              material={material}
              isFetching={isFetchingMaterial}
              error={materialError as Error | null}
            />
          </Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
});

export default WorkorderSidesheet.render;
