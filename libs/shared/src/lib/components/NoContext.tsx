import styled from 'styled-components';

const StyledNoContext = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const NoContext = () => {
  return (
    <StyledNoContext>
      <h2>Choose a valid context</h2>
    </StyledNoContext>
  );
};
