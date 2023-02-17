import {
  BannerItem,
  proCoSysUrls,
  SidesheetHeader,
  StatusCircle,
  StyledBanner,
  StyledItemLink,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
  TabsWrapper,
} from '@cc-components/shared';
import { getSwcrStatusColor, SwcrPackage } from '@cc-components/swcrshared';
import { Tabs } from '@equinor/eds-core-react';
import { createWidget } from '@equinor/workspace-sidesheet';
import { useSignatures } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTab';

type SwcrProps = {
  id: string;
  item?: SwcrPackage;
  close: () => void;
};
export const SwcrSidesheet = createWidget<SwcrProps>(({ props }) => {
  const { signatures, signaturesFetching } = useSignatures(props.id);
  const attachmentsUrls = props?.item?.url.replace('#', '#tab=attachments&');
  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={`${props?.item?.swcrNo || ''}, ${props?.item?.title || ''} `}
        applicationTitle={'Software change record'}
        onClose={props.close}
      />
      <StyledBanner>
        <BannerItem
          title="SWCR"
          value={
            <StyledItemLink
              target="_blank"
              href={proCoSysUrls.getSwcrUrl(props?.item?.swcrId || '')}
            >
              {props?.item?.swcrNo}
            </StyledItemLink>
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
