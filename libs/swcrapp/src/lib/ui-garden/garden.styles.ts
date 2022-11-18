import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
type SwcrItemProps = { backgroundColor: string; textColor: string; isSelected: boolean };

export const StyledItemWrapper = styled.div<SwcrItemProps>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 100%;
  outline: ${(props) => (props.isSelected ? '2px dashed green' : '')};
  outline-offset: ${(props) => (props.isSelected ? '2px' : '')};
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
