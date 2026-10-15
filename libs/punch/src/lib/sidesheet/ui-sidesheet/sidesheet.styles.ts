import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const StyledTabListWrapper: any = styled.div`
  overflow: hidden;
  width: 100%;
  background-color: ${tokens.colors.ui.background__light.hex};
`;

export const StyledTabsList: any = styled(Tabs.List)`
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  scroll-behavior: smooth;
`;

export const StyledTextBlock: any = styled.div`
  max-width: 960px;

  pre {
    white-space: pre-wrap;
    line-height: 1.5em;
    font-family: Equinor;
  }
`;
