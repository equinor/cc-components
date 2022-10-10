import styled from 'styled-components';

const StyledCcComponents = styled.div`
  color: pink;
`;

export function CcComponents() {
  return (
    <StyledCcComponents>
      <h1>Welcome to CcComponents!</h1>
      {'hi'}
    </StyledCcComponents>
  );
}

export default CcComponents;
