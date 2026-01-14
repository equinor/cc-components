import { useState, useContext, createContext } from 'react';
import { TabsProps, TabPanelsProps } from '@equinor/eds-core-react';

import { StyledTabs, StyledPanels } from './tabs.styles';
import React from 'react';

// ########## Custom Tabs Context ##########

const TabsContext = createContext(0);

// ########## Custom Tabs ##########

type CustomTabsProps = {
  initialTabIndex?: number;
};

type CustomProps = CustomTabsProps & TabsProps;

export const CustomStyledTabs = (props: CustomProps) => {
  const [activeTab, setActiveTab] = useState(props.initialTabIndex ?? 0);

  const handleChange = (value: number | string) => {
    const index = typeof value === 'number' ? value : parseInt(value, 10);
    setActiveTab(index);
    if (props.onChange) props.onChange(index);
  };

  return (
    <TabsContext.Provider value={activeTab}>
      <StyledTabs {...props} activeTab={activeTab} onChange={handleChange} />
    </TabsContext.Provider>
  );
};

// ########## Custom Panels ##########

export const CustomStyledPanels = (props: TabPanelsProps) => {
  const activeTab = useContext(TabsContext);

  const panelChildren = React.Children.toArray(props.children);

  const children = panelChildren.map((child, index) => {
    if (index == activeTab) return child;
    return <></>;
  });

  return <StyledPanels {...props} children={children} />;
};
