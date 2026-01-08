import { Menu, MenuProps, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import React, { forwardRef } from 'react';
import { styled, StyledComponent } from 'styled-components';

export const DropdownContainer = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 24px;
  white-space: nowrap;
  padding-left: 6px;
  border-radius: 5px;
  overflow: hidden;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  cursor: pointer;
  p:not(:first-child) {
    padding-left: 4px;
  }
  &:hover {
    background-color: ${tokens.colors.interactive.primary__hover_alt.hex};
  }
  * {
    ${({ selected }) => selected && `color: ${tokens.colors.interactive.primary__resting.hex} !important;`}
    text-transform: capitalize;
  }
`;

export const VirtualListContainer = styled.div`
  max-height: 400px;
  max-width: 100%;
  min-width: 200px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const VirtualListItemContainer = styled.div<{ height: number }>`
  height: ${({ height }) => height + 2 + 'px'};
  width: 100%;
  position: relative;
`;

export const DropdownListItem = styled.div.attrs<{ height: number; start: number }>((props) => ({
  style: {
    transform: `translateY(${props.start}px)`,
  },
}))`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  min-width: 200px;
  height: ${({ height }) => height + 'px'};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  padding: 0 8px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: ${tokens.colors.interactive.primary__hover_alt.hex};
  }
`;

export const DropdownMenu: React.FC<MenuProps> = styled(
  forwardRef<HTMLDivElement | null, MenuProps>((props, ref) => <Menu {...props} ref={ref} />)
)(({ theme }) => ({
  '& [class^=MenuList__List]': {
    padding: 0,
  },
}));

export const SearchbarContainer = styled.div`
  padding: 8px;
  background-color: unset;
  border-bottom: 2px solid ${tokens.colors.ui.background__medium.rgba};
  input {
    width: 100%;
    padding: 8px;
    border: 2px solid ${tokens.colors.ui.background__medium.rgba};
    border-radius: 5px;
    font-size: 14px;
    color: ${tokens.colors.text.static_icons__tertiary.hex};
    background-color: ${tokens.colors.ui.background__light.rgba};
    box-sizing: border-box;
    &:focus {
      outline: none;
      border-color: ${tokens.colors.interactive.primary__resting.hex};
    }
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 8px;
  border-top: 2px solid ${tokens.colors.ui.background__medium.rgba};
`;

export const ListItemText: StyledComponent<typeof Typography, any> = styled(Typography)`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
