import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
`;

const StyledStatusColor = styled.div<{ color: string | undefined }>`
  margin: 0 4px;
  width: 10px;
  height: 12px;
  background-color: ${(props) => props.color};
`;

const StyledTitle = styled.div`
  align-self: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
type StatusSquareProps = {
  statusColor: string;
  content: string;
};
/**
 * Component for displaying a colored square based on the status and the status on the right.
 */
export const StatusSquare = ({ statusColor, content }: StatusSquareProps) => {
  return (
    <StyledContainer>
      <StyledStatusColor color={statusColor} />
      <StyledTitle>{content}</StyledTitle>
    </StyledContainer>
  );
};
