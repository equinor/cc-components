import { StatusCircle } from '@cc-components/shared/common';
import {
  BannerItem,
  SidesheetHeader,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
  TabsWrapper,
} from '@cc-components/sharedcomponents';
import { getSwcrStatusColor, SwcrPackage } from '@cc-components/swcrshared';
import { Tabs } from '@equinor/eds-core-react';
import { useSignatures } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTab';

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
  const { signatures, signaturesFetching } = useSignatures(props.id);
  const attachmentsUrls = props?.item?.url.replace('#', '#tab=attachments&');
  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={`${props?.item?.swcrNo || ''}, ${props?.item?.title || ''} `}
        applicationTitle={'Software change record'}
        onClose={props.closeSidesheet}
      />
      <StyledBanner>
        <BannerItem
          title="SWCR"
          value={
            props?.item?.swcrNo ?? 'N/A'
            // <StyledItemLink
            //   target="_blank"
            //   href={proCoSysUrls.getSwcrUrl(props?.item?.swcrId || '')}
            // >
            //   {props?.item?.swcrNo}
            // </StyledItemLink>
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
      </StyledBanner>
      <StyledTabs>
        <TabsWrapper>
          <Tabs.Tab>Details</Tabs.Tab>
        </TabsWrapper>

        <StyledPanels>
          <Tabs.Panel>
            <DetailsTab
              attachmentsUrls={attachmentsUrls}
              item={props?.item}
              signatures={signatures}
              signaturesFetching={signaturesFetching}
            />
          </Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
});

export default SwcrSidesheet.render;
