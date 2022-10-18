import styled from 'styled-components';

/* eslint-disable-next-line */
export interface PunchappProps {}

const StyledPunchapp = styled.div`
  color: pink;
`;

export function Punchapp(props: PunchappProps) {
  return (
    <StyledPunchapp>
      <h1>Welcome to Punchapp!</h1>
    </StyledPunchapp>
  );
}

export default Punchapp;
