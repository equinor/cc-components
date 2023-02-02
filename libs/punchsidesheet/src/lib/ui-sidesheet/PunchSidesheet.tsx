import { Punch } from '@cc-components/punchshared';
import {
  BannerItem,
  proCoSysUrls,
  SidesheetHeader,
  StyledBanner,
  StyledItemLink,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
} from '@cc-components/shared';
import { Tabs } from '@equinor/eds-core-react';
import { createWidget } from '@equinor/workspace-sidesheet';
import { useRef, useState } from 'react';
import { DetailsTab } from './DetailsTab';
import { StyledTabListWrapper, StyledTabsList } from './sidesheet.styles';
type PunchProps = {
  id: string;
  item?: Punch;
  close: () => void;
};
export const PunchSidesheet = createWidget<PunchProps>(({ props }) => {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const handleChange = (index: number) => {
    setActiveTab(index);
    ref && ref.current && ref.current.scrollTo({ left: index ** index });
  };

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader title={props.item?.punchItemNo || ''} onClose={props.close} />
      <StyledBanner>
        <BannerItem
          title="Form type"
          value={
            <StyledItemLink
              target="_blank"
              href={proCoSysUrls.getFormTypeUrl(props.item?.checklistUrlId || '')}
            >
              {props.item?.formularType}
            </StyledItemLink>
          }
        />
        <BannerItem
          title="Tag"
          value={
            <StyledItemLink
              target="_blank"
              href={proCoSysUrls.getTagUrl(props.item?.tagUrlId || '')}
            >
              {props.item?.tagNo}
            </StyledItemLink>
          }
        />
        <BannerItem
          title="Commpkg"
          value={
            <StyledItemLink
              target="_blank"
              href={proCoSysUrls.getCommPkgUrl(
                props.item?.commissioningPackageUrlId || ''
              )}
            >
              {props.item?.commissioningPackageNo}
            </StyledItemLink>
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
            <DetailsTab punch={props.item} />
          </Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
});

export default PunchSidesheet.render;
