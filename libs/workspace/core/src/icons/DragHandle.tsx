import { ReactElement } from 'react';
import styled from 'styled-components';

interface DragHandleIconProps {
  color?: string;
  style?: React.CSSProperties;
}

const StyledSvg = styled.svg<{ color?: string }>`
  path {
    fill: ${({ color }) => color || 'currentColor'};
  }
`;

export const DragHandleIcon = ({ color, style }: DragHandleIconProps): ReactElement => (
  <StyledSvg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" color={color} style={style}>
    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M4 9h16v2H4zm16 6H4v-2h16z" />
  </StyledSvg>
);
