import styled from 'styled-components';

export const Statuses = styled.div`
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
