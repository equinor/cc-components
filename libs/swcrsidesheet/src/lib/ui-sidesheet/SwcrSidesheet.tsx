import { StatusCircle } from '@cc-components/shared/common';
import { useContextId, useHttpClient } from '@cc-components/shared';
import { LinkCell } from '@cc-components/shared/table-helpers';
import {
  BannerItem,
  SidesheetHeader,
  SidesheetSkeleton,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabListWrapper,
  StyledTabs,
  StyledTabsList,
  TabTitle,
} from '@cc-components/sharedcomponents';
import { SwcrPackage, getSwcrStatusColor } from '@cc-components/swcrshared';
import { Icon, Tabs } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useSignatures } from '../utils-sidesheet';
import { DetailsTab } from './DetailsTab';
import { SignaturesTab } from './SignaturesTab';
import { useQuery } from '@tanstack/react-query';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { useAttachments } from '../utils-sidesheet/useAttachments';
import { AttachmentTab } from './AttachmentTab';

type SwcrProps = {
  id: string;
  item?: SwcrPackage;
  close: VoidFunction;
};

export const SwcrSidesheet = ({ id, close: closeSidesheet, item }: SwcrProps) => {
  const client = useHttpClient();
  const contextId = useContextId();

  const { isLoading, data, error } = useQuery({
    queryKey: ['swcr', id],
    queryFn: async () => {
      const res = await client.fetch(`/api/contexts/${contextId}/swcr/${id}`);
      if (!res.ok) {
        throw new Error(`Failed to get swcr with id ${id}`);
      }
      return res.json() as Promise<SwcrPackage>;
    },
    refetchOnWindowFocus: false,
    initialData: item ?? undefined,
  });

  if (isLoading) {
    return <SidesheetSkeleton close={() => closeSidesheet()} />;
  }

  if (error || !data) {
    return (
      <div
        style={{ display: 'grid', placeItems: 'center', height: '100%', width: '100%' }}
      >
        <ErrorWrapper>
          <Icon
            name="error_outlined"
            size={48}
            color={tokens.colors.interactive.primary__resting.hsla}
          />
          <ErrorMessage>{`Failed to load details for ${id}`}</ErrorMessage>
        </ErrorWrapper>
      </div>
    );
  }

  return <SwcrSidesheetComponent id={id} item={data} close={closeSidesheet} />;
};

export const SwcrSidesheetComponent = ({
  id,
  close: closeSidesheet,
  item,
}: Required<SwcrProps>) => {
  const {
    data: signatures,
    isLoading: signaturesFetching,
    error: signaturesError,
  } = useSignatures(id);
  const {
    data: attachments,
    isLoading: attachmentsFetching,
    error: attachmentsError,
  } = useAttachments(id);
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (value: number | string) => {
    const index = typeof value === 'number' ? value : parseInt(value, 10);
    setActiveTab(index);
  };

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={`${item.softwareChangeRecordNo}, ${item.title} `}
        applicationTitle={'Software change record'}
        onClose={closeSidesheet}
      />
      <StyledBanner>
        <BannerItem
          title="SWCR"
          value={
            item.softwareChangeRecordNo && item.swcrUrl ? (
              <LinkCell
                url={item.swcrUrl}
                urlText={item.softwareChangeRecordNo}
                aiLinkLocation="swcr sidesheet header"
                aiLinktype="SwcrNo"
              />
            ) : (
              item.softwareChangeRecordNo ?? 'N/A'
            )
          }
        />
        <BannerItem
          title="Status"
          value={
            <StatusCircle
              content={item.status}
              statusColor={getSwcrStatusColor(item.status)}
            />
          }
        />
        <BannerItem title="Project" value={item.project ?? 'N/A'} />
        <BannerItem title="Facility" value={item.facility ?? 'N/A'} />
        <BannerItem title="Contract" value={item.contract ?? 'N/A'} />
        <BannerItem title="Priority" value={item.priority ?? 'N/A'} />
        <BannerItem title="Supplier" value={item.supplier ?? 'N/A'} />
        <BannerItem title="System" value={item.system ?? 'N/A'} />
      </StyledBanner>
      <StyledTabs activeTab={activeTab} onChange={handleChange}>
        <StyledTabsList>
          <Tabs.Tab>Details</Tabs.Tab>
          <Tabs.Tab>
            Signatures <TabTitle isLoading={signaturesFetching} data={signatures} />
          </Tabs.Tab>
          <Tabs.Tab>
            Attachments <TabTitle isLoading={attachmentsFetching} data={attachments} />
          </Tabs.Tab>
        </StyledTabsList>
        <StyledPanels>
          <Tabs.Panel>
            <DetailsTab item={item} />
          </Tabs.Panel>
          <Tabs.Panel>
            <SignaturesTab
              signatures={signatures}
              isFetching={signaturesFetching}
              error={signaturesError}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <AttachmentTab
              attachments={attachments}
              isFetching={attachmentsFetching}
              error={attachmentsError}
              detailsItem={item}
            />
          </Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
};
const ErrorWrapper = styled.div`
  text-align: center;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const ErrorMessage = styled.h3`
  margin: 0;
`;
