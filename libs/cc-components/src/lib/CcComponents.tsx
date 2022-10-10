import styled from 'styled-components';

/* eslint-disable-next-line */
export interface CcComponentsProps {}

const StyledCcComponents = styled.div`
  color: pink;
`;

export function CcComponents(props: CcComponentsProps) {
  return (
    <StyledCcComponents>
      <h1>Welcome to CcComponents!</h1>
    </StyledCcComponents>
  );
}

export default CcComponents;
