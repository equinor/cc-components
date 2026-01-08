import { ReactElement } from 'react';
import styled from 'styled-components';

interface StarOutlinedIconProps {
  color?: string;
}

const StyledSvg = styled.svg<{ color?: string }>`
  path {
    fill: ${({ color }) => color || 'currentColor'};
  }
`;

export const StarOutlinedIcon = ({ color }: StarOutlinedIconProps): ReactElement => (
  <StyledSvg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" color={color}>
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M14.2451 10.0898H21.5107L15.6328 14.3604L17.8779 21.2695L12 16.999L6.12207 21.2695L8.36719 14.3604L2.48926 10.0898H9.75488L12 3.17969L14.2451 10.0898ZM10.8447 11.5898H7.10645L10.1309 13.7871L8.97461 17.3428L12 15.1455L15.0244 17.3428L13.8691 13.7871L16.8936 11.5898H13.1553L12 8.03418L10.8447 11.5898Z"
    />
  </StyledSvg>
);
