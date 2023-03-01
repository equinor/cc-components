import styled from 'styled-components';

/* eslint-disable-next-line */
export interface CommonProps {}

const StyledCommon = styled.div`
  color: pink;
`;

export function Common(props: CommonProps) {
  return (
    <StyledCommon>
      <h1>Welcome to Common!</h1>
    </StyledCommon>
  );
}

export default Common;
