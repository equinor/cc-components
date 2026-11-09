import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

/** Pins its absolutely positioned children to the left edge of the scroll container */
export const StyledFrozenColumn = styled.div`
  position: sticky;
  left: 0;
  z-index: 1;
  background-color: ${tokens.colors.ui.background__default.hex};
  box-shadow: 2px 0 4px -2px rgba(0, 0, 0, 0.3);
`;

export const StyledLayoutRoot = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
`;
export const StyledLayoutContainer = styled.div<{ width: number; height: number; isScrolling: boolean }>`
  position: relative;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  pointer-events: ${(props) => (props.isScrolling ? 'none' : 'auto')};
`;
