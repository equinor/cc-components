import {
  BannerItem,
  SidesheetHeader,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
} from '@cc-components/shared/sidesheet';
import { Tabs } from '@equinor/eds-core-react';
import { createWidget } from '@equinor/workspace-sidesheet';
import { useRef, useState } from 'react';
// import { DetailsTab } from './DetailsTab';
import { StyledTabListWrapper, StyledTabsList } from './sidesheet.styles';
import { useQuery } from '@tanstack/react-query';
import { LinkCell, useContextId, useHttpClient } from '@cc-components/shared';
import { SidesheetSkeleton } from '@cc-components/sharedcomponents';
import { DetailsSidesheetProps } from '@equinor/workspace-fusion/sidesheet';
import { Electrical } from '../config/workspaceConfig';


export const ElectricalSidesheet = createWidget<{id: string, item?: Electrical, close: VoidFunction}>(({props}) => {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const handleChange = (index: number) => {
    setActiveTab(index);
    ref.current && ref.current.scrollTo({ left: index ** index });
  };

//   const client = useHttpClient();
//   const contextId = useContextId();

  const {
    data: electrical,
    error,
    isLoading: isLoadingSidesheet,
  } = useQuery(
    ['electrical', props.id],
    async () => {
      return props.item
    throw new Error("Fetching Electrical consumer failed.")
    //   const res = await client.fetch(`/api/contexts/${contextId}/punch/${props.id}`);
    //   if (!res.ok) throw res;
    //   return res.json() as Promise<Punch>;
    },
    {
      suspense: false,
      initialData: props.item ?? undefined,
      useErrorBoundary: false,
    }
  );

  if (isLoadingSidesheet) {
    return <SidesheetSkeleton close={props.close} />;
  }

  if (!electrical || error) {
    return <div>Failed to get Electrical with id: {props.id}</div>;
  }

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={electrical.description || ''}
        applicationTitle={'Punch'}
        onClose={props.close}
      />
      <StyledBanner>
        <BannerItem
          title="Discipline"
          value={
            electrical.disciplinecode
          }
        />
        <BannerItem
          title="Consumer"
          value={
          electrical.consumer
          }
        />
        <BannerItem
          title="Switchboard"
          value={
            electrical.swbboard
          }
        />
        <BannerItem
          title="System"
          value={
            electrical.systemno
          }
        />
      </StyledBanner>
      <StyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList ref={ref}>
            <Tabs.Tab>Details </Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>

        <StyledPanels>
          <Tabs.Panel>
            <div>tbd</div>
            {/* <DetailsTab punch={electrical} /> */}
          </Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  )}
  ) 

