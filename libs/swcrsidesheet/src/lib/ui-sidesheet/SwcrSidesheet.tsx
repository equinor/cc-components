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

type SwcrProps = {
  id: string;
  item?: SwcrPackage;
  close: VoidFunction;
};

export const SwcrSidesheet = ({ id, close: closeSidesheet, item }: SwcrProps) => {
  const { data: signatures, isLoading: signaturesFetching, error } = useSignatures(id);
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (index: number) => {
    setActiveTab(index);
  };
  const attachmentsUrls = item?.swcrUrl.replace('#', '#tab=attachments&');
  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={`${item?.softwareChangeRecordNo || ''}, ${item?.title || ''} `}
        applicationTitle={'Software change record'}
        onClose={closeSidesheet}
      />
      <StyledBanner>
        <BannerItem
          title="SWCR"
          value={
            item?.softwareChangeRecordNo && item?.swcrUrl ? (
              <LinkCell url={item.swcrUrl} urlText={item.softwareChangeRecordNo} />
            ) : (
              item?.softwareChangeRecordNo ?? 'N/A'
            )
          }
        />
        <BannerItem
          title="Status"
          value={
            <StatusCircle
              content={item?.status || ''}
              statusColor={getSwcrStatusColor(item?.status)}
            />
          }
        />
        <BannerItem title="Contract" value={item?.contract ?? 'N/A'} />
        <BannerItem title="Priority" value={item?.priority ?? 'N/A'} />
        <BannerItem title="Supplier" value={item?.supplier ?? 'N/A'} />
        <BannerItem title="System" value={item?.system ?? 'N/A'} />
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
              item={item}
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
};
