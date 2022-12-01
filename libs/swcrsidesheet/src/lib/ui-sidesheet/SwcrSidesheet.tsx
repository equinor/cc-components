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
} from '@cc-components/shared';
import { getSwcrStatusColor, SwcrPackage } from '@cc-components/swcrshared';
import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { createWidget } from '@equinor/workspace-sidesheet';
import styled from 'styled-components';
import { useSignatures } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTab';
export const StyledTabListWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  background-color: ${tokens.colors.ui.background__light.hex};
`;
export const StyledTabsList = styled(Tabs.List)`
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  scroll-behavior: smooth;
`;

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
      <SidesheetHeader title={props?.item?.title || ''} onClose={props.close} />
      <StyledBanner>
        <BannerItem
          title="Status"
          value={
            <StatusCircle
              content={props?.item?.status || ''}
              statusColor={getSwcrStatusColor(props?.item?.status)}
            />
          }
        />
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
        <BannerItem title="Comm pkg" value={props?.item?.cpkgNo || ''} />
      </StyledBanner>
      <StyledTabs>
        <StyledTabListWrapper>
          <StyledTabsList>
            <Tabs.Tab>Details</Tabs.Tab>
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
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
});

export default SwcrSidesheet.render;
