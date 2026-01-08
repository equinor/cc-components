import { ReactElement } from 'react';
import styled from 'styled-components';

interface SmallCloseIconProps {
  color?: string;
}

const StyledSvg = styled.svg<{ color?: string }>`
  display: block;
  margin: auto;
  path {
    fill: ${({ color }) => color || 'currentColor'};
  }
`;

export const SmallCloseIcon = ({ color }: SmallCloseIconProps): ReactElement => (
  <StyledSvg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" color={color}>
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M10 1.007 8.993 0 5 3.993 1.007 0 0 1.007 3.993 5 0 8.993 1.007 10 5 6.007 8.993 10 10 8.993 6.007 5z"
      transform="translate(7 7)"
    />
  </StyledSvg>
);
