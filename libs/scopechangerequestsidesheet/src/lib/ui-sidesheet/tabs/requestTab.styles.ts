import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

interface VerticalLineProps {
  active: boolean;
}

export const VerticalLine = styled.div<VerticalLineProps>`
  border-left: 1px solid
    ${({ active }) =>
      active ? tokens.colors.interactive.primary__resting.hex : '#DCDCDC'};
  height: 100%;
  width: 1px;
  margin-top: 5px;
`;

export const DetailText = styled.div`
  font-size: 14px;
`;

export const WorklowIconAndLine = styled.div`
  grid-column: col / span 1;
  grid-row: 1 / span 100;
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100%;
`;

export const StyledRequestTabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1em;
`;

export const StyledRequestColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50%;
  overflow-wrap: break-word;
`;
export const StyledWorkflowText = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;
