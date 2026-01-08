import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Divider } from '../divider/Divider';

export const TabButton = styled.button<{ isactive: boolean }>`
  height: auto;
  width: 48px;
  border: none;
  background: none;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  & path {
    fill: ${({ isactive }) => isactive && `${tokens.colors.interactive.primary__resting.hex}`};
  }
  ::after {
    content: '';
    position: absolute;
    bottom: 1px;
    right: 0;
    left: 0;
    height: 2px;
    background-color: ${({ isactive }) => isactive && `${tokens.colors.interactive.primary__resting.hex}`};
  }
`;

export const TabButtonList = styled.div`
  height: 100%;
  display: flex;
  padding-right: 0.5rem;
`;

export const TabButtonDivider = () => <Divider />;
