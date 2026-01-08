import { jsx as _jsx } from "react/jsx-runtime";
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
const StyledDivider = styled.hr `
  width: ${({ width = '1px' }) => (typeof width === 'string' ? width : `${width}px`)};
  height: auto;
  align-self: stretch;
  background: ${({ color = tokens.colors.ui.background__medium.hex }) => color};
  border: none;
`;
/**
 * 1px vertical divider
 */
export const Divider = () => _jsx(StyledDivider, {});
