import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const StyledContentWrapper = styled.div`
  padding: 1em;
`;

export const StyledTabs = styled(Tabs)`
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
`;

export const StyledPanels = styled(Tabs.Panels)`
  overflow: auto;
  padding: 1em;
`;

export const StyledTabListWrapper = styled.div`
  overflow: auto;
  width: 100%;
  background-color: ${tokens.colors.ui.background__light.hex};
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  scroll-behavior: smooth;
`;
