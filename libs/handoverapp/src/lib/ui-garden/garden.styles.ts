import styled from 'styled-components';
//#region Garden item
export const StyledRoot = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 2px;
  position: relative;
`;

export type ItemProps = {
  backgroundColor: string;
  textColor: string;
  isSelected: boolean;
};

export const StyledItemWrapper = styled.div<ItemProps>`
  display: grid;
  grid-template-columns: 15px 0.75fr auto auto;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  height: 100%;
  border-radius: 5px;
  font-weight: 500;
  font-size: 13px;
  padding: 0 2px 0 20px;

  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};

  outline: ${(props) => (props.isSelected ? '2px dashed green' : 'none')};
  outline-offset: ${(props) => (props.isSelected ? '2px' : '0')};
`;
type SizesProps = {
  size: 'small' | 'medium' | 'large';
  color: string;
};
export const StyledSizes = styled.div<SizesProps>`
  position: absolute;
  top: 0px;
  left: 4px;
  width: 10px;
  height: 2px;
  border-radius: 2px;
  box-shadow: ${(props) =>
    props.size === 'large'
      ? `0px 5px 0px 0px ${props.color}, 0px 11px 0px 0px ${props.color}, 0px 17px 0px 0px ${props.color}`
      : props.size === 'medium'
      ? `0px 11px 0px 0px ${props.color}, 0px 17px 0px 0px ${props.color}`
      : ` 0px 17px 0px 0px ${props.color}`};
`;

export const StyledItemText = styled.div`
  font-variant-numeric: tabular-nums;
  grid-column: 2/3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type StatusCirclesProps = {
  mcColor: string;
  commColor: string;
};
export const StyledStatusCircles = styled.div<StatusCirclesProps>`
  display: flex;
  grid-column: 4;
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
export const StyledWarningIconWrapper = styled.div`
  position: absolute;
  top: 3px;
  grid-column: 3;
  z-index: 1;
`;
//#endregion

//#region Popover
export const StyledIconsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto;
  padding-top: 10px;
`;
export const StyledWarningContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row: 1;
  gap: 5px;
`;
export const StyledWarningText = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-self: flex-end;
  white-space: initial;

  > p {
    text-decoration: underline;
    font-size: 14px;
  }
`;
export const StyledFlagUnsignedAction = styled.div`
  display: flex;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row: 1;
  justify-content: end;
  align-items: flex-start;
  gap: 5px;

  > p {
    text-decoration: underline;
    font-size: 14px;
  }
`;
export const StyledStatuses = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8;

  > div {
    margin-right: 16px;

    &:last-child {
      margin: 0;
    }
  }
`;
//#endregion
