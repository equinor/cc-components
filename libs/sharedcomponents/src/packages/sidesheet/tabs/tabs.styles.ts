import { Tabs, TabsProps } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const StyledContentWrapper = styled.div`
  padding: 1em;
`;

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

export const StyledTabs: (props: TabsProps) => JSX.Element = styled(Tabs)`
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
`;

export const StyledPanels = styled(Tabs.Panels)`
  overflow: auto;
  /** Removing padding from Tabs.Panel components */
  > div {
    padding: 0;
  }
`;
