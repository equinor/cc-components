import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
export const StyledButton = styled(Button) `
  min-width: 40px;
`;
export const StyledButtonContent = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  white-space: nowrap;
`;
export const StyledFilterBar = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100vw;
  height: 48px;
  background: ${tokens.colors.ui.background__light.hex};
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  gap: 8px;
  border-bottom: 2px solid ${tokens.colors.ui.background__medium.rgba};
`;
export const StyledFilterLoadingFallback = styled.div `
  height: 48px;
  width: 100%;
  background: ${tokens.colors.ui.background__light.hex};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1em;

  & > div:last-child {
    margin-right: 1em;
  }
`;
