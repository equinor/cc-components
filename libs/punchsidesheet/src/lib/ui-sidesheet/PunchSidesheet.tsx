import { Punch } from '@cc-components/punchshared';
import {
  BannerItem,
  SidesheetHeader,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
} from '@cc-components/shared/sidesheet';
import { Tabs } from '@equinor/eds-core-react';
import { createWidget } from '@cc-components/shared';
import { useRef, useState } from 'react';
import { DetailsTab } from './DetailsTab';
import { StyledTabListWrapper, StyledTabsList } from './sidesheet.styles';
import { useQuery } from '@tanstack/react-query';
import { LinkCell, useContextId, useHttpClient } from '@cc-components/shared';
import { SidesheetSkeleton } from '@cc-components/sharedcomponents';

export const PunchSidesheet = createWidget<Punch>(({ props }) => {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const handleChange = (index: number) => {
    setActiveTab(index);
    ref.current && ref.current.scrollTo({ left: index ** index });
  };

  const client = useHttpClient();
  const contextId = useContextId();

  const {
    data: punch,
    error,
    isLoading: isLoadingSidesheet,
  } = useQuery(
    ['punch', props.id],
    async () => {
      const res = await client.fetch(`/api/contexts/${contextId}/punch/${props.id}`);
      if (!res.ok) throw res;
      return res.json() as Promise<Punch>;
    },
    {
      suspense: false,
      initialData: props.item ?? undefined,
      useErrorBoundary: false,
    }
  );

  if (isLoadingSidesheet) {
    return <SidesheetSkeleton close={props.closeSidesheet} />;
  }

  if (!punch || error) {
    return <div>Failed to get Punch with id: {props.id}</div>;
  }

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={punch.punchItemNo || ''}
        applicationTitle={'Punch'}
        onClose={props.closeSidesheet}
      />
      <StyledBanner>
        <BannerItem
          title="Form type"
          value={
            !punch.formTypeUrl || !punch.formularType ? (
              ''
            ) : (
              <LinkCell url={punch.formTypeUrl} urlText={punch.formularType} />
            )
          }
        />
        <BannerItem
          title="Tag"
          value={
            !punch.tagUrl || !punch.tagNo ? (
              ''
            ) : (
              <LinkCell url={punch.tagUrl} urlText={punch.tagNo} />
            )
          }
        />
        <BannerItem
          title="Comm Pkg"
          value={
            !punch.commissioningPackageUrl || !punch.commissioningPackageNo ? (
              ''
            ) : (
              <LinkCell
                url={punch.commissioningPackageUrl}
                urlText={punch.commissioningPackageNo}
              />
            )
          }
        />
        <BannerItem
          title="MC Pkg"
          value={
            !punch.mechanicalCompletionPackageUrl ||
            !punch.mechanicalCompletionPackageNo ? (
              ''
            ) : (
              <LinkCell
                url={punch.mechanicalCompletionPackageUrl}
                urlText={punch.mechanicalCompletionPackageNo}
              />
            )
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
            <DetailsTab punch={punch} />
          </Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
});

export default PunchSidesheet.render;
