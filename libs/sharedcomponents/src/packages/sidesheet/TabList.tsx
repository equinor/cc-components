import { ReactNode } from 'react';
import { StyledTabListWrapper, StyledTabsList } from './tabs.styles';
type TabsWrapperProps = {
  children: ReactNode;
};
/**
 * Component to wrap Tabs.Tab in.
 * @param children - Tabs.tab from EDS
 */
export const TabsWrapper = ({ children }: TabsWrapperProps) => {
  return (
    <StyledTabListWrapper>
      <StyledTabsList>{children}</StyledTabsList>
    </StyledTabListWrapper>
  );
};
