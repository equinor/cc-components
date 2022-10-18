import styled from 'styled-components';
export const StyledContainer = styled.div`
  display: flex;
  justify-items: center;
`;
export const StyledStatusColor = styled.div<{ color: string }>`
  margin: 0 4px;
  width: 10px;
  height: 12px;
  background-color: ${(props) => props.color};
`;

export const StyledTitle = styled.div`
  align-self: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
