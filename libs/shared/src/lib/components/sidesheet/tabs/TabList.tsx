import { Tabs } from '@equinor/eds-core-react';
import { PropsWithChildren } from 'react';
import { StyledTabListWrapper, StyledTabs } from './tabs.styles';

type TabListProps = {
  activeTab: number;
  handleChange: (index: number) => void;
};
export const TabList = ({
  activeTab,
  handleChange,
  children,
}: PropsWithChildren<TabListProps>) => {
  return (
    <StyledTabs activeTab={activeTab} onChange={handleChange}>
      <StyledTabListWrapper>
        <Tabs.List>{children}</Tabs.List>
      </StyledTabListWrapper>
    </StyledTabs>
  );
};
