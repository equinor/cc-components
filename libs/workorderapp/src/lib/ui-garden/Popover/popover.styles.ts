import styled from 'styled-components';

export const StyledStatuses = styled.div`
  margin-top: 15px;
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

export const StyledHoldBy = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  text-decoration: underline;
`;
