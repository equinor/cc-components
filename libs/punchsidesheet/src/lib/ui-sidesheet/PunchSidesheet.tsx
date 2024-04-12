import { Punch, PunchStatus } from '@cc-components/punchshared';
import {
  BaseStatus,
  LinkCell,
  colorMap,
  hasProperty,
  useContextId,
  useHttpClient,
} from '@cc-components/shared';

import { statusColorMap } from '@cc-components/shared/mapping';

import {
  BannerItem,
  SidesheetHeader,
  SidesheetSkeleton,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
} from '@cc-components/sharedcomponents';

import { ModelViewerTab, TagOverlay } from '@cc-components/modelviewer';

import { Tabs } from '@equinor/eds-core-react';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { DetailsTab } from './DetailsTab';
import { StyledTabListWrapper, StyledTabsList } from './sidesheet.styles';

const viewerOptions = {
  statusResolver: (status: string) => {
    return hasProperty(colorMap, status)
      ? statusColorMap[status as BaseStatus]
      : '#9e9e9e';
  },
  defaultCroppingDistance: 3,
};

export const PunchSidesheet = (props: {
  id: string;
  item?: Punch | undefined;
  close: VoidFunction;
}) => {
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

  const tagsOverlay = punch
    ? ([
        {
          tagNo: punch.tagNo ?? '',
          description: punch.description,
          status: punch.category,
          icon: <h3>{punch.category}</h3>,
        },
      ] as TagOverlay[])
    : [];

  if (isLoadingSidesheet) {
    return <SidesheetSkeleton close={props.close} />;
  }

  if (!punch || error) {
    return <div>Failed to get Punch with id: {props.id}</div>;
  }

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={punch.punchItemNo || ''}
        applicationTitle={'Punch'}
        onClose={props.close}
        url={punch.punchUrl}
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
            <Tabs.Tab>3D </Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>

        <StyledPanels>
          <Tabs.Panel>
            <DetailsTab punch={punch} />
          </Tabs.Panel>
          <Tabs.Panel style={{ height: '100%' }}>
            <ModelViewerTab
              tagOverlay={tagsOverlay}
              options={viewerOptions}
              isFetching={false}
              error={null}
              facilities={[punch.facility ?? '']}
            />
          </Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
};
