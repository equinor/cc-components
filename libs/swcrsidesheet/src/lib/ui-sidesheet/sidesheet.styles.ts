import styled from 'styled-components';

export const StyledTagsAndAttachmentBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledTags = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 10px;
`;
export const StyledChipText = styled.div`
  font-size: 16px;
  text-align: center;
`;
export const StyledAttachments = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;
export const StyledTextBlock = styled.div`
  border-bottom: 1px solid black;
  max-width: 960px;
  white-space: pre-wrap;
  padding-bottom: 30px;
`;

export const StyledTextBlockEmpty = styled.div``;

export const StyledSignatures = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 3fr 1fr 5fr;
`;
