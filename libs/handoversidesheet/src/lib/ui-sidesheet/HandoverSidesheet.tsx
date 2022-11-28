import { HandoverPackage } from '@cc-components/handovershared';
import {
  McTab,
  NcrTab,
  PunchTab,
  QueryTab,
  StyledSideSheetContainer,
  SwcrTab,
  UnsignedActionTab,
  UnsignedTaskTab,
  WorkorderTab,
} from '@cc-components/shared';
import { Tabs } from '@equinor/eds-core-react';
import { createWidget } from '@equinor/workspace-sidesheet';
import { useRef, useState } from 'react';
import { useHandoverResource } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTabs';
import { StyledTabListWrapper } from './sidesheet.styles';
type HandoverProps = {
  id: string;
  item?: HandoverPackage;
};
export const HandoverSidesheet = createWidget<HandoverProps>(({ frame, props }) => {
  const [activeTab, setActiveTab] = useState(0);
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

  const { data: detailsData, dataIsFetching: isDataFetchingDetails } =
    useHandoverResource(props.id, 'details');

  const {
    data: ncrPackages,
    dataIsFetching: isDataFetchingNcr,
    error: ncrError,
  } = useHandoverResource(props.id, 'ncr');

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

  return (
    <StyledSideSheetContainer>
      <Tabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper ref={ref}>
          <Tabs.List>
            <Tabs.Tab>Details</Tabs.Tab>
          </Tabs.List>
        </StyledTabListWrapper>

        <Tabs.Panels>
          <Tabs.Panel>
            <DetailsTab
              commpkg={props.item as HandoverPackage}
              dataIsFetching={isDataFetchingDetails}
              nextToSign={detailsData}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <McTab mc={mcPackages} isFetching={isDataFetchingMc} error={mcError} />
          </Tabs.Panel>
          <Tabs.Panel>
            <WorkorderTab
              workorders={workOrderPackages}
              isFetching={isDataFetchingWorkOrder}
              error={woError}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <UnsignedTaskTab
              unsignedTasks={unsignedTasks}
              isFetching={isDataFetchingUnsignedTasks}
              error={unsignedTasksError}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <UnsignedActionTab
              unsignedActions={unsignedActions}
              isFetching={isDataFetchingUnsignedActions}
              error={unsignedActionsError}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <PunchTab
              punches={punchPackages}
              isFetching={isDataFetchingPunch}
              error={punchError}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <SwcrTab
              swcrs={swcrPackages}
              isFetching={isDataFetchingSwcr}
              error={swcrError}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <NcrTab ncrs={ncrPackages} isFetching={isDataFetchingNcr} error={ncrError} />
          </Tabs.Panel>
          <Tabs.Panel>
            <QueryTab
              queries={queryPackages}
              isFetching={isDataFetchingQuery}
              error={queryError}
            />
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </StyledSideSheetContainer>
  );
});

export default HandoverSidesheet.render;
