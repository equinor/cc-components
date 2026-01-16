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
  CustomStyledPanels,
  CustomStyledTabs,
  SidesheetHeader,
  SidesheetSkeleton,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
} from '@cc-components/sharedcomponents';

import { LazyModelViewerTab } from '@cc-components/modelviewer';

import { Tabs } from '@equinor/eds-core-react';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { DetailsTab } from './DetailsTab';
import { StyledTabListWrapper, StyledTabsList } from './sidesheet.styles';
import { useModelViewerTags } from '../utils-sidesheet/useModelViewerTags';

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
  const handleChange = (value: number | string) => {
    const index = typeof value === 'number' ? value : parseInt(value, 10);
    setActiveTab(index);
    ref.current && ref.current.scrollTo({ left: index ** index });
  };

  const client = useHttpClient();
  const contextId = useContextId();

  const {
    data: punch,
    error,
    isLoading: isLoadingSidesheet,
  } = useQuery({
    queryKey: ['punch', props.id],
    queryFn: async () => {
      const res = await client.fetch(`/api/contexts/${contextId}/punch/${props.id}`);
      if (!res.ok) throw res;
      return res.json() as Promise<Punch>;
    },
    initialData: props.item ?? undefined,
    throwOnError: false,
  });

  const tagsOverlay = useModelViewerTags(punch);

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
              <LinkCell
                url={punch.formTypeUrl}
                urlText={punch.formularType}
                aiLinkLocation="punch sidesheet header"
                aiLinktype="Formular Type"
              />
            )
          }
        />
        <BannerItem
          title="Tag"
          value={
            !punch.tagUrl || !punch.tagNo ? (
              ''
            ) : (
              <LinkCell
                url={punch.tagUrl}
                urlText={punch.tagNo}
                aiLinkLocation="punch sidesheet header"
                aiLinktype="TagNo"
              />
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
                aiLinkLocation="punch sidesheet header"
                aiLinktype="CommPkgNo"
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
                aiLinkLocation="punch sidesheet header"
                aiLinktype="McPkgNo"
              />
            )
          }
        />
      </StyledBanner>
      <CustomStyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList ref={ref}>
            <Tabs.Tab>Details </Tabs.Tab>
            <Tabs.Tab>3D </Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>

        <CustomStyledPanels>
          <Tabs.Panel>
            <DetailsTab punch={punch} />
          </Tabs.Panel>
          <Tabs.Panel style={{ height: '100%' }}>
            <LazyModelViewerTab
              tagOverlay={tagsOverlay}
              options={viewerOptions}
              isFetching={false}
              error={null}
              facilities={[punch.facility ?? '']}
            />
          </Tabs.Panel>
        </CustomStyledPanels>
      </CustomStyledTabs>
    </StyledSideSheetContainer>
  );
};
