import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const StyledTabContent = styled.div`
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  h3 {
    padding: 8px;
  }
`;
/**
 * Styled component to use in a details view.
 */
export const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  margin-bottom: 32px;

  th {
    text-align: left;
  }

  td {
    border-bottom: 1px solid ${tokens.colors.ui.background__medium.hex};
    padding: 8px;
    font-size: 14px;

    &:first-child {
      width: 240px;
      font-weight: bold;
    }
  }
`;
