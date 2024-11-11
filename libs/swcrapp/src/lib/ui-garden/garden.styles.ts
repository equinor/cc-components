import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
type SwcrItemProps = {
  $backgroundColor: string;
  $textColor: string;
  $isSelected: boolean;
};

export const StyledItemWrapper = styled.div<SwcrItemProps>`
  display: grid;
  grid-template-columns: 15px 3fr auto;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  background: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
  cursor: pointer;
  height: 100%;
  border-radius: 5px;
  font-weight: 500;
  font-size: 13px;
  padding-left: 20px;
  padding-right: 2px;
  outline: ${(props) => (props.$isSelected ? '2px dashed green' : '')};
  outline-offset: ${(props) => (props.$isSelected ? '2px' : '')};
  width: 100%;

  &:before {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 10px;
    content: ' ';
  }
`;

export const StyledRoot = styled.div`
  height: 85%;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 5px;
`;

export const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  align-items: center;
  font-weight: 600;
`;

//#region Grouped view
export const StyledSwcrGroup = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  margin: 0;
  align-items: center;
  margin-bottom: 4px;
  border: 1px solid ${tokens.colors.text.static_icons__tertiary.rgba};
  border-radius: 5px;
  color: ${tokens.colors.text.static_icons__default.rgba};
  min-width: 200px;
  cursor: pointer;

  :hover {
    opacity: 0.5;
  }
  min-width: 50px;
`;

export const StyledGroupedTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledGroupText = styled.div`
  display: flex;
`;

export const StyledChevron = styled.div`
  min-width: 24px;
`;
export const StyledCount = styled.span`
  color: ${tokens.colors.text.static_icons__default.rgba};
  font-weight: 300;
  font-size: 0.8rem;
  margin-left: 0.8em;
  padding-bottom: 0.5rem;
`;
//#endregion
