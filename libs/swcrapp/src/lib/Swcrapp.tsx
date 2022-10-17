import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SwcrappProps {}

const StyledSwcrapp = styled.div`
  color: pink;
`;

export function Swcrapp(props: SwcrappProps) {
  return (
    <StyledSwcrapp>
      <h1>Welcome to Swcrapp!</h1>
    </StyledSwcrapp>
  );
}

export default Swcrapp;
