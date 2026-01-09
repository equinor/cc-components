import styled from 'styled-components';
import { Checkbox, Typography, Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import type { StyledComponent } from 'styled-components';

export const FilterListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: fit-content;
  padding: 0 16px;
  gap: 16px;
`;

export const FilterContainer = styled.div<{
  width: number;
  minWidth: number;
  maxWidth: number;
}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: ${({ width }) => width}px;
  min-width: ${({ minWidth }) => minWidth}px;
  max-width: ${({ maxWidth }) => maxWidth}px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  position: relative;
`;

export const ResizeHandle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 6px;
  height: 100%;
  cursor: col-resize;
  background-color: transparent;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background-color: transparent;
  }

  &:hover::after,
  &:active::after {
    background-color: ${tokens.colors.interactive.primary__resting.hex};
  }
`;

export const FilterContainerHeader = styled.div<{ isfilteractive: Boolean }>`
  box-sizing: border-box;
  padding: 8px;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid
    ${({ isfilteractive }) =>
      isfilteractive
        ? tokens.colors.interactive.primary__resting.hex
        : tokens.colors.ui.background__medium.rgba};
  justify-content: space-between;
`;

export const ListItemContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  padding: 8px 0;
`;

export const SmallCheckbox = styled(Checkbox)`
  padding: 0;
  &::before {
    display: none;
  }
`;

export const ListItem = styled.div<{ start: number; height: number }>`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  padding-left: 8px;
  box-sizing: border-box;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  transform: ${({ start }) => `translateY(${start}px)`};
  height: ${({ height }) => `${height}px`};
  &:hover {
    background-color: ${tokens.colors.interactive.primary__hover_alt.hex};
  }
`;

export const ListItemText: StyledComponent<typeof Typography, any, {}, never> = styled(
  Typography
)`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ItemCount: StyledComponent<typeof Typography, any, {}, never> = styled(
  Typography
)`
  margin-left: auto;
`;
export const SearchbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  outline: 2px solid ${tokens.colors.ui.background__medium.rgba};
  border-radius: 5px;
  background-color: ${tokens.colors.ui.background__light.rgba};
  &:focus-within {
    outline-color: ${tokens.colors.interactive.primary__resting.hex};
  }
  input {
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    font-size: 14px;
    color: ${tokens.colors.text.static_icons__tertiary.hex};
    box-sizing: border-box;
    outline: none;
    border: none;
    background-color: inherit;
    &:focus-within {
      outline: none;
      border: none;
    }
  }
`;

export const HeaderIconButton: StyledComponent<typeof Button, any, {}, never> = styled(
  Button
)`
  aspect-ratio: 1;
  width: 32px;
  color: ${tokens.colors.text.static_icons__tertiary.hex} !important;
`;
