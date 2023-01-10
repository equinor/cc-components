import { createWidget } from '@equinor/workspace-sidesheet';
import {
  BannerItem,
  MaterialTab,
  MccrTab,
  proCoSysUrls,
  SidesheetHeader,
  StatusCircle,
  statusColorMap,
  StyledBanner,
  StyledItemLink,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
  TabTitle,
} from '@cc-components/shared';
import { useState } from 'react';
import { Tabs } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { WorkOrder } from '@cc-components/workordershared';
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
        title={props?.item?.workOrderNumber || ''}
        onClose={props.closeSidesheet}
      />
      <StyledBanner>
        <BannerItem title="WO status" value={<div></div>} />
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
            <Tabs.Tab>3D</Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>

        <StyledPanels>
          <Tabs.Panel>
            <DetailsTab workOrder={props?.item} />
          </Tabs.Panel>
          <Tabs.Panel>
            <MccrTab mccr={mccr} isFetching={isFetchingMccr} error={mccrError} />
          </Tabs.Panel>
          <Tabs.Panel>
            <MaterialTab
              material={material}
              isFetching={isFetchingMaterial}
              error={materialError}
            />
          </Tabs.Panel>

          <Tabs.Panel>3D coming soon</Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
});

export default WorkorderSidesheet.render;
