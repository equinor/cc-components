import { MaterialTab, MccrTab, StyledSideSheetContainer } from '@cc-components/shared';
import { Tabs } from '@equinor/eds-core-react';
import { useState } from 'react';
import { WorkOrder } from '..';
import { DetailsTab } from './DetailsTab';

type WorkorderSidesheetProps = {
  id: string;
  workOrder?: WorkOrder;
};
export const WorkorderSidesheet = ({
  id,
  workOrder,
}: WorkorderSidesheetProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);

  
  const handleChangeTab = (index: number) => {
    setActiveTab(index);
  };
  return (
    <StyledSideSheetContainer>
      <Tabs activeTab={activeTab} onChange={handleChangeTab}>
        <Tabs.List>
          <Tabs.Tab>Details</Tabs.Tab>
          <Tabs.Tab>MCCR</Tabs.Tab>
          <Tabs.Tab>Material</Tabs.Tab>
          <Tabs.Tab>3D</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panels>
          <Tabs.Panel>
            <DetailsTab workOrder={workOrder} />
          </Tabs.Panel>
          <Tabs.Panel>
            <MaterialTab error={null} isFetching={false} material={[]} />
          </Tabs.Panel>
          <Tabs.Panel>
            <MccrTab error={null} isFetching={false} mccr={[]} />
          </Tabs.Panel>
          <Tabs.Panel>3D</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </StyledSideSheetContainer>
  );
};
