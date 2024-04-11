import { Tabs as EdsTabs } from '@equinor/eds-core-react';
import { ReactNode, useState } from 'react';
import { CustomStyledPanels, CustomStyledTabs } from './CustomTabs';
import { StyledTabListWrapper, StyledTabsList } from './tabs.styles';

export type TabConfig = {
  tabTitle: ReactNode;
  tabContent: JSX.Element;
};

export type TabsProps = {
  tabs: TabConfig[];
  initialTabIndex?: number;
};

export const Tabs = (props: TabsProps) => {
  const [activeTab, setActiveTab] = useState(props.initialTabIndex ?? 0);

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <CustomStyledTabs activeTab={activeTab} onChange={handleChange}>
      <StyledTabListWrapper>
        <StyledTabsList>
          {props.tabs.map((tab, i) => (
            <EdsTabs.Tab key={i}> {tab.tabTitle}</EdsTabs.Tab>
          ))}
        </StyledTabsList>
      </StyledTabListWrapper>
      <CustomStyledPanels>
        {props.tabs.map((tab, i) =>
          activeTab === i ? (
            <EdsTabs.Panel key={i}>{tab.tabContent}</EdsTabs.Panel>
          ) : (
            <></>
          )
        )}
      </CustomStyledPanels>
    </CustomStyledTabs>
  );
};
