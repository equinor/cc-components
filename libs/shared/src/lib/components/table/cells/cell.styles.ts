import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const StyledDescription = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const StyledProgressBarContainer = styled.div`
  height: 16px;
  width: 68px;
  background-color: #f5f5f5;
  border-bottom: 2px #dcdcdc solid;
  width: -webkit-fill-available;
  position: relative;
`;

export const StyledActualProgress = styled.div<{
  width: number;
  borderColor?: string;
  color?: string;
}>`
  background-color: ${({ color }) => `${color ?? '#CCE6F3'}`};
  width: ${({ width }) => `${width}%`};
  height: 16px;
  border-bottom: ${({ borderColor }) => `2px ${borderColor ?? '#0084C4'} solid`};
`;
export const StyledProgressNumber = styled.div`
  position: absolute;
  right: 5px;
  top: 0;
`;
export const StyledLink = styled.a`
  color: ${tokens.colors.interactive.primary__resting.hex};
  text-decoration: none;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
