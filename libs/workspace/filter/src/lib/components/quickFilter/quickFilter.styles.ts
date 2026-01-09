import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const QuickFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  gap: 10px;
`;

export const QuickFilterChip = styled.div`
  align-items: center;
  padding: 4px 8px;
  border-radius: 16px;
  background-color: ${tokens.colors.ui.background__info.hex};
  user-select: none;
  white-space: nowrap;
`;
