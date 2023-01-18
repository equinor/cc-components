import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

/**
 * Standard link component.
 * Use this when you have an `<a>`-tag.
 */
export const StyledItemLink = styled.a`
  color: ${tokens.colors.interactive.primary__resting.hex};
  text-decoration: none;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
