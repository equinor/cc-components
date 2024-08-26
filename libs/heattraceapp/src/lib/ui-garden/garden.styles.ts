import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
export const StyledRoot = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 5px;
  position: relative;
`;
export type ItemProps = { $backgroundColor: string; $isSelected: boolean };

export const StyledItemWrapper = styled.div<ItemProps>`
  display: grid;
  grid-template-columns: 3fr auto;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  background: ${(props) => props.$backgroundColor};
  color: ${tokens.colors.text.static_icons__default.rgba};
  cursor: pointer;
  border: 1px solid #ededed;
  height: 100%;
  border-radius: 5px;
  font-weight: 500;
  font-size: 13px;
  padding-left: 20px;
  padding-right: 2px;
  outline: ${(props) => (props.$isSelected ? '2px dashed green' : '')};
  outline-offset: ${(props) => (props.$isSelected ? '2px' : '')};
  width: 100%;
`;

export const StyledItemText = styled.div`
  grid-column: 1/2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type StatusCirclesProps = {
  $mcColor: string | null;
  $commColor: string | null;
};
export const StyledStatusCircles = styled.div<StatusCirclesProps>`
  display: flex;
  grid-column: 3/4;
  justify-content: end;
  align-items: center;

  &:before {
    width: 12px;
    height: 12px;
    border: 1px solid white;
    background-color: ${(props) => props.$mcColor};
    border-radius: 50%;
    margin: 0px 1px;
    content: ' ';
  }
  &:after {
    width: 12px;
    height: 12px;
    border: 1px solid white;
    background-color: ${(props) => props.$commColor};
    border-radius: 50%;
    margin: 0px 1px;
    content: ' ';
  }
`;

export const StyledDescription = styled.p`
  all: unset;
  width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
