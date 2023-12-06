import { createWidget } from '@cc-components/shared';
import { StatusCircle } from '@cc-components/shared/common';
import { LinkCell } from '@cc-components/shared/table-helpers';
import {
  BannerItem,
  SidesheetHeader,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabListWrapper,
  StyledTabs,
  StyledTabsList,
  TabTitle,
} from '@cc-components/sharedcomponents';
import { SwcrPackage, getSwcrStatusColor } from '@cc-components/swcrshared';
import { Tabs } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useSignatures } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTab';
import { SignaturesTab } from './SignaturesTab';

import { createWidget as createResizableSidesheet } from '@equinor/workspace-sidesheet';

import { PropsWithChildren } from 'react';
import { useCloseSidesheetOnContextChange } from '@cc-components/shared';

type BaseProps<T> = {
  id: string;
  item?: T;
  closeSidesheet: VoidFunction;
};

export function createWidget<T>(
  Comp: (props: { props: BaseProps<T> }) => JSX.Element,
  resizeOptions?: {
    defaultWidth?: number | undefined;
  }
) {
  return createResizableSidesheet(
    (props: { props: BaseProps<T> }) => (
      <SidesheetWrapper closeSidesheet={props.props.closeSidesheet}>
        <Comp props={props.props} />
      </SidesheetWrapper>
    ),
    resizeOptions
  );
}

export function SidesheetWrapper<T>({
  closeSidesheet,
  children,
}: PropsWithChildren<{ closeSidesheet: VoidFunction }>) {
  useCloseSidesheetOnContextChange(closeSidesheet);

  return <>{children}</>;
}

export const SwcrSidesheet = createWidget<SwcrPackage>(({ props }) => {
  const { signatures, signaturesFetching, error } = useSignatures(props.id);
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (index: number) => {
    setActiveTab(index);
  };
  const attachmentsUrls = props?.item?.swcrUrl.replace('#', '#tab=attachments&');
  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={`${props?.item?.softwareChangeRecordNo || ''}, ${
          props?.item?.title || ''
        } `}
        applicationTitle={'Software change record'}
        onClose={props.closeSidesheet}
      />
      <StyledBanner>
        <BannerItem
          title="SWCR"
          value={
            props?.item?.softwareChangeRecordNo && props?.item?.swcrUrl ? (
              <LinkCell
                url={props.item.swcrUrl}
                urlText={props.item.softwareChangeRecordNo}
              />
            ) : (
              props?.item?.softwareChangeRecordNo ?? 'N/A'
            )
          }
        />
        <BannerItem
          title="Status"
          value={
            <StatusCircle
              content={props?.item?.status || ''}
              statusColor={getSwcrStatusColor(props?.item?.status)}
            />
          }
        />
        <BannerItem title="Contract" value={props?.item?.contract ?? 'N/A'} />
        <BannerItem title="Priority" value={props?.item?.priority ?? 'N/A'} />
        <BannerItem title="Supplier" value={props?.item?.supplier ?? 'N/A'} />
        <BannerItem title="System" value={props?.item?.system ?? 'N/A'} />
      </StyledBanner>
      <StyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabListWrapper>
          <StyledTabsList>
            <Tabs.Tab>Details</Tabs.Tab>
            <Tabs.Tab>
              Signatures <TabTitle isLoading={signaturesFetching} data={signatures} />
            </Tabs.Tab>
          </StyledTabsList>
        </StyledTabListWrapper>
        <StyledPanels>
          <Tabs.Panel>
            <DetailsTab
              attachmentsUrls={attachmentsUrls}
              item={props?.item}
              signatures={signatures}
              signaturesFetching={signaturesFetching}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <SignaturesTab
              error={error}
              isFetching={signaturesFetching}
              signatures={signatures}
            />
          </Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
});

export default SwcrSidesheet.render;
