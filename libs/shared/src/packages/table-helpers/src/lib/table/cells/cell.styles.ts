import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
/**
 * Use this together with
 * ```
 * autoHeight: true,
 * wrapText: true
 * ```
 * in the column definition to display the whole text and insert break lines.
 */
export const StyledFullDescription = styled.div`
  word-break: break-word;
`;

/**
 * Will only display text until it overflows and add ellipsis at the end.
 */
export const StyledDescription = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const StyledProgressBarContainer = styled.div`
  height: 8px;
  /* width: 68px; */
  background-color: #f5f5f5;
  border: 2px #dcdcdc solid;
  width: -webkit-fill-available;
  position: relative;
  border-radius: 10px;
`;

export const StyledActualProgress = styled.div<{
  width: number;
  borderColor?: string;
  color?: string;
}>`
  background-color: ${({ color }) => `${color ?? '#CCE6F3'}`};
  width: ${({ width }) => `${width}%`};
  height: 100%;
  border: ${({ borderColor }) => `2px ${borderColor ?? '#0084C4'} solid`};
  border-radius: 10px;
  margin: -2px;
  position: relative;
  z-index: 1;
`;
export const StyledProgressNumber = styled.div`
  line-height: normal;
  z-index: 1;
  width: 36px;
`;
export const StyledLink = styled.a`
  font-variant-numeric: tabular-nums;
  color: ${tokens.colors.interactive.primary__resting.hex};
  text-decoration: none;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const StyledStatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: fit-content;
  font-weight: 400;
  font-size: 13px;
`;
export const StyledStatus = styled.div`
  background-color: green;
  height: 12px;
  width: 12px;
  border-radius: 50%;
`;
