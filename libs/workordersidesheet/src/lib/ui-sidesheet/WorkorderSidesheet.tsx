import { createWidget } from '@equinor/workspace-sidesheet';
import { useState } from 'react';
import { Tabs } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import {
  WorkOrder,
  getMatStatusColorByStatus,
  getMccrStatusColorByStatus,
} from '@cc-components/workordershared';
import { useMaterial, useMccr } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTab';
import {
  BannerItem,
  MaterialTab,
  MccrTab,
  SidesheetHeader,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
  TabTitle,
  StyledItemLink,
  useHttpClient,
  useContextId,
  StatusCircle,
  LinkCell,
} from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { SidesheetSkeleton } from '@cc-components/sharedcomponents';

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
