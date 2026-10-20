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
export type ItemProps = {
  backgroundColor: string;
  isSelected: boolean;
  textColor: string;
};

export const StyledItemWrapper = styled.a<ItemProps>`
  text-decoration: none;
  display: grid;
  grid-template-columns: 3fr auto;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  cursor: pointer;
  border: 1px solid #ededed;
  height: 100%;
  border-radius: 5px;
  font-weight: 500;
  font-size: 13px;
  padding-left: 20px;
  padding-right: 2px;
  outline: ${(props) => (props.isSelected ? '2px dashed green' : '')};
  outline-offset: ${(props) => (props.isSelected ? '2px' : '')};
  width: 100%;
`;

export const StyledItemText = styled.div`
  grid-column: 1/2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type StatusCirclesProps = {
  mcColor: string | null;
  commColor: string | null;
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
    background-color: ${(props) => props.mcColor};
    border-radius: 50%;
    margin: 0px 1px;
    content: ' ';
  }
  &:after {
    width: 12px;
    height: 12px;
    border: 1px solid white;
    background-color: ${(props) => props.commColor};
    border-radius: 50%;
    margin: 0px 1px;
    content: ' ';
  }
`;

export const StyledStatuses = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;

  > div {
    margin-right: 16px;

    &:last-child {
      margin: 0;
    }
  }
`;
type NoStatusProps = {
  size: 'small' | 'medium';
};
export const StyledNoStatus = styled.div<NoStatusProps>`
  outline: ${(props) =>
    `${props.size === 'small' ? '2px' : '4px'} dashed ${
      tokens.colors.ui.background__medium.hex
    }`};
  border-radius: ${(props) => (props.size === 'small' ? '17px' : '21px')};
  height: ${(props) => (props.size === 'small' ? '16px' : '20px')};
  width: ${(props) => (props.size === 'small' ? '16px' : '20px')};
`;

export const StyledDescription = styled.p`
  all: unset;
  width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
