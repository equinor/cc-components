import { Tabs, TabsProps } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ReactElement } from 'react';
import styled from 'styled-components';

export const StyledContentWrapper = styled.div`
  height: 100%;
`;

export const StyledTabs: (props: TabsProps) => ReactElement = styled(Tabs)`
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

export const StyledPanel = styled(Tabs.Panel)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledTabsList = styled(Tabs.List)`
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  scroll-behavior: smooth;
`;

export const StyledTabListWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  background-color: ${tokens.colors.ui.background__light.hex};
`;
