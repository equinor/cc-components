import { ReactNode, useState } from 'react';
import {
  StyledTabs,
  StyledTabListWrapper,
  StyledTabsList,
  StyledPanels,
} from './tabs.styles';
import { Tabs as EdsTabs } from '@equinor/eds-core-react';

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
    <StyledTabs activeTab={activeTab} onChange={handleChange}>
      <StyledTabListWrapper>
        <StyledTabsList>
          {props.tabs.map((tab, i) => (
            <EdsTabs.Tab key={i}> {tab.tabTitle}</EdsTabs.Tab>
          ))}
        </StyledTabsList>
      </StyledTabListWrapper>
      <StyledPanels>
        {props.tabs.map((tab, i) =>
          activeTab === i ? (
            <EdsTabs.Panel key={i}>{tab.tabContent}</EdsTabs.Panel>
          ) : (
            <></>
          )
        )}
      </StyledPanels>
    </StyledTabs>
  );
};
