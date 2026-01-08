import { ReactElement } from 'react';
import styled from 'styled-components';

interface StarIconProps {
  color?: string;
}

const StyledSvg = styled.svg<{ color?: string }>`
  path {
    fill: ${({ color }) => color || 'currentColor'};
  }
`;

export const StarIcon = ({ color }: StarIconProps): ReactElement => (
  <StyledSvg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" color={color}>
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M14.2451 9.91016H21.5107L15.6328 14.1807L17.8779 21.0898L12 16.8193L6.12207 21.0898L8.36719 14.1807L2.48926 9.91016H9.75488L12 3L14.2451 9.91016Z"
    />
  </StyledSvg>
);
