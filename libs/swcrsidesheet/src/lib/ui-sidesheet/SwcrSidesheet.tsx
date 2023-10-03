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
import { createWidget } from '@cc-components/shared';
import { useSignatures } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTab';

export const SwcrSidesheet = createWidget<SwcrPackage>(({ props }) => {
  const { signatures, signaturesFetching } = useSignatures(props.id);
  const attachmentsUrls = props?.item?.swcrUrl.replace('#', '#tab=attachments&');
  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={`${props?.item?.softwareChangeRecordNo || ''}, ${props?.item?.title || ''} `}
        applicationTitle={'Software change record'}
        onClose={props.closeSidesheet}
      />
      <StyledBanner>
        <BannerItem
          title="SWCR"
          value={
            props?.item?.softwareChangeRecordNo ?? 'N/A'
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
