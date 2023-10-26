import styled from 'styled-components';
import { useModuleCurrentContext } from '@equinor/fusion-framework-react-module-context';
import { useLayoutEffect } from 'react';

const StyledNoContext = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const NoContext = () => {
  const { setCurrentContext } = useModuleCurrentContext();

  useLayoutEffect(() => {
    if (window.location.href.includes('localhost')) {
      setCurrentContext('94dd5f4d-17f1-4312-bf75-ad75f4d9572c');
    }
  }, [window.location.href]);

  return (
    <StyledNoContext>
      <h2>Choose a valid context</h2>
    </StyledNoContext>
  );
};
